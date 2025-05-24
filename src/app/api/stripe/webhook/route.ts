import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { headers as nextHeaders } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await nextHeaders()).get('Stripe-Signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set.');
    return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Farklı event tiplerini handle et
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session completed:', session.id);

      // Metadata'dan Supabase User ID'yi al
      const supabaseUserId = session.metadata?.supabaseUserId;
      if (!supabaseUserId) {
        console.error('Webhook Error: supabaseUserId not found in session metadata', session.id);
        return NextResponse.json({ error: 'User ID missing in metadata' }, { status: 400 });
      }

      // Ödeme başarılı, kullanıcıya analiz hakkı ver
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ has_analysis_credit: true })
        .eq('id', supabaseUserId);

      if (updateError) {
        console.error('Supabase user credit update error:', updateError, session.id);
        return NextResponse.json({ error: 'Failed to update user credit' }, { status: 500 });
      }

      // (Opsiyonel) payments tablosuna kayıt ekle
      try {
        await supabaseAdmin.from('payments').insert({
          user_id: supabaseUserId,
          stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : 'N/A',
          amount: session.amount_total || 0, // amount_total sent cinsinden gelir
          currency: session.currency || 'usd',
          status: 'succeeded',
        });
      } catch (paymentInsertError) {
        console.error('Error inserting payment record:', paymentInsertError, session.id);
        // Bu hata ana akışı etkilememeli
      }

      console.log(`Successfully gave analysis credit to user ${supabaseUserId}`);
      break;

    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntentSucceeded.id);
      // Burada ek işlemler yapılabilir, örneğin fulfillment.
      break;

    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', paymentIntentFailed.id, paymentIntentFailed.last_payment_error?.message);
      // Kullanıcıya bilgi verilebilir.
      break;

    // ... diğer event tipleri ...
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
} 
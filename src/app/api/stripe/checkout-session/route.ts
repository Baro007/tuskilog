import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // authOptions'ı kendi dosya yolunuza göre güncelleyin
import { stripe } from '@/lib/stripe'; // Stripe client'ı oluşturacağız
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;

    // Supabase'den kullanıcıyı al ve stripe_customer_id'sini kontrol et
    let {
      data: user,
      error: userError,
    } = await supabaseAdmin
      .from('users')
      .select('id, stripe_customer_id')
      .eq('email', userEmail)
      .single();

    if (userError || !user) {
      console.error('Supabase user fetch error:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let customerId = user.stripe_customer_id;

    // Eğer kullanıcı için Stripe customer ID yoksa, yeni bir tane oluştur
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          supabaseUserId: user.id,
        },
      });
      customerId = customer.id;
      // Yeni customerId'yi Supabase'e kaydet
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);

      if (updateError) {
        console.error('Supabase customerId update error:', updateError);
        // Hata olsa bile devam et, en kötü ihtimalle bir sonraki ödemede güncellenir
      }
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      throw new Error('STRIPE_PRICE_ID environment variable is not set.');
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Stripe Checkout Session oluştur
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/test/clinical?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/test/clinical?payment_cancelled=true`,
      metadata: {
        supabaseUserId: user.id, // Webhook'ta kullanmak için
      },
    });

    if (!checkoutSession.url) {
        return NextResponse.json({ error: 'Could not create Stripe session' }, { status: 500 });
    }

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });

  } catch (error: any) {
    console.error('Stripe Checkout Session Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
} 
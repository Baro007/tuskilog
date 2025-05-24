import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) { // next-auth session'dan user.id'yi kullanıyoruz
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('has_analysis_credit')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user credit from Supabase:', error);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ has_analysis_credit: false }); // Kullanıcı bulunamadı, kredi yok
    }

    return NextResponse.json({ has_analysis_credit: data.has_analysis_credit });

  } catch (error: any) {
    console.error('Check Credit API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
} 
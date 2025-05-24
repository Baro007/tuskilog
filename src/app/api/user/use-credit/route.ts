import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const { error } = await supabaseAdmin
      .from('users')
      .update({ has_analysis_credit: false })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user credit in Supabase:', error);
      return NextResponse.json({ error: 'Failed to update user credit' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User credit successfully used.' });

  } catch (error: any) {
    console.error('Use Credit API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
} 
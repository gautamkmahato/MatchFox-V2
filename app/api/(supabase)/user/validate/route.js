import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';


export async function POST() {
  try {
    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    console.log(user?.id)
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: true, error: 'Unauthorized', message: "Failed" }, { status: 401 });
    }

    // Step 2: Verify the user exists in the Supabase "users" table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: true, error: 'User not found in database', message: "Failed" }, { status: 403 });
    }

    return NextResponse.json({ state: true, data: userRecord, message: "Success" }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: true, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}


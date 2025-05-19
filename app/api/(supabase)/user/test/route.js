import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';

export async function POST(req) {
  try {
    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: "Failed" }, { status: 401 });
    }

    // Step 2: Get form data from request body
    const { name, email, interview_id, user_id, started_at } = await req.json();
    if (!name || !email || !interview_id || !user_id || !started_at) {
      return NextResponse.json({ state: false, error: 'Missing name or email or interview_id, user_id, started_at', message: 'Failed' }, { status: 400 });
    }

    console.log("name, email: ", name, email, interview_id, user_id, started_at)

    return NextResponse.json({ state: true, data: "inserted", message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';


export async function POST(req) {
  try { 
    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    console.log(user?.id)
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: "Failed" }, { status: 401 });
    }

    // Step 2: Get form data from request body
    const { interviewId } = await req.json();
    if (!interviewId) {
      return NextResponse.json({ state: false, error: 'Missing interviewId', message: 'Failed' }, { status: 400 });
    }

    // Step 2: Verify the user exists in the Supabase "users" table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database', message: "Failed" }, { status: 403 });
    }

     const { data: interviewAttempt, error: interviewError } = await supabase
        .from("interview_attempts")
        .select("*")
        .eq("user_id", userId)
        .eq('interview_id', interviewId)
        .eq('status', 'completed')
        .maybeSingle();

    if(interviewError){
        return NextResponse.json({ state: false, error: 'Already attempted the interview', message: "Failed" }, { status: 400 });
    }

    return NextResponse.json({ state: true, data: interviewAttempt, message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}

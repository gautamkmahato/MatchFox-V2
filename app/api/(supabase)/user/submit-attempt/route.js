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
    const { status, interview_id, user_id, started_at } = await req.json();
    if (!status || !interview_id || !user_id || !started_at) {
      return NextResponse.json({ state: false, error: 'Missing status or interview_id, user_id, started_at', message: 'Failed' }, { status: 400 });
    }

    // Step 3: Verify the user exists in Supabase "users" table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database', message: "Failed" }, { status: 403 });
    }

    // Step 4: Check if the interview was already attempted
    const { data: interviewAttempt, error: interviewError } = await supabase
      .from('interview_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('interview_id', interview_id)
      .eq('status', 'completed')
      .maybeSingle();


    if (interviewAttempt) {
      return NextResponse.json({ state: false, error: 'Already attempted the interview', message: "Failed" }, { status: 400 });
    }

    // Step 5: Insert new attempt
    const { data: inserted, error: insertError } = await supabase
      .from('interview_attempts')
      .insert([
        {
          user_id: userId,
          interview_id: interview_id,
          started_at: started_at,
          interview_attempt: true,
          status: status
        }
      ])
      .select()
      .single()

    console.log(insertError)

    if (insertError) {
      return NextResponse.json({ state: false, error: 'Insert failed', message: "Failed" }, { status: 500 });
    }

    // update in the interviews table also
    
    const { data, error: updateError } = await supabase
      .from('interviews')
      .update({ status: 'completed' })
      .eq('id', interview_id)
      .select()

    console.log(updateError)

    if (updateError) {
      return NextResponse.json({ state: false, error: 'Update failed in interviews table', message: "Failed" }, { status: 500 });
    }
          

    return NextResponse.json({ state: true, data: inserted, message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}

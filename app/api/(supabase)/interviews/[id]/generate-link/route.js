import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { currentUser } from '@clerk/nextjs/server'; // Assuming you're using Clerk
import supabase from '@/lib/supabase/client';
import { isValidUUID } from '@/lib/utils/validateUuid';


export async function POST(req, { params }) {
  const interviewId = params.id;

  console.log("interviewId: ", interviewId)

  // Step 1: Get authenticated Clerk user
  const user = await currentUser();
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

  // Step 3: Check if this user is the owner of the interview
  const { data: interview, error: interviewError } = await supabase
    .from('interviews')
    .select('*') // Assuming 'user_id' is the foreign key to the "users" table
    .eq('id', interviewId)
    .single();

  console.log("interview data: ", interview);

  if (interviewError || !interview) {
    return NextResponse.json({ state: false, error: 'Interview not found' }, { status: 404 });
  }

  console.log("interview.clerk_id: ", interview.user_id);
  console.log("userId: ", userId);

  if (interview.user_id !== userId) {
    return NextResponse.json({ state: false, error: 'You are not the owner of this interview' }, { status: 403 });
  }

  // Step 4: Create the meeting link
  const link = `${process.env.NEXT_APP_HOSTNAME}/meet/${interviewId}`;

  console.log("link: ", link)

  try {
    const { data, error } = await supabase
      .from('meeting_links')
      .upsert({
        interview_id: interviewId,
        link: link,
        created_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ state: false, error: error.message }, { status: 500 });
    }

    // update the link to interview
    const { data: updatedInterview, error: interviewUpdateError } = await supabase
      .from('interviews')
      .update({ interview_link: link })
      .eq('id', interviewId)
      .select()
      .maybeSingle()
      .throwOnError(); // throws error if anything silently fails



    if (!isValidUUID(interviewId)) {
      return NextResponse.json({ state: false, error: 'Invalid interview ID format' }, { status: 400 });
    }

    console.log("typeof interviewId:", typeof interviewId); // should be 'string'

    console.log("updated interview: ", updatedInterview);
    console.log("updated error: ", interviewUpdateError)

    if (interviewError) {
      return NextResponse.json({ state: false, error: interviewError.message }, { status: 500 });
    }

    return NextResponse.json({ state: true, data, message: 'Link created successfully' });
  } catch (err) {
    return NextResponse.json({ state: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

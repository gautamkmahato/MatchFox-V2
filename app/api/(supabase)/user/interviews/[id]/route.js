// app/api/interviews/[id]/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';

const supabase = createClient();

const ParamsSchema = z.object({
  id: z.string().uuid({ message: 'Invalid interview ID format' })
});

export async function GET(req, context) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const validation = ParamsSchema.safeParse(context.params);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const interviewId = context.params.id;

    // Check user exists in DB
    const { data: userRecord, error: userErr } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (userErr || !userRecord) {
      return NextResponse.json({ error: 'User not found in DB' }, { status: 403 });
    }

    // Fetch interview
    const { data: interview, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .eq('user_id', userRecord.id) // Optional: only allow owner
      .single();

    if (error) {
      return NextResponse.json({ error: 'Interview not found or access denied' }, { status: 404 });
    }

    return NextResponse.json({ interview }, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

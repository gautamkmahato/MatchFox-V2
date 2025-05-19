import { NextResponse } from 'next/server';
import generateUuid from '@/lib/utils/generateUuid';
import supabase from '@/lib/supabase/client';


export async function POST(request) {
  try {
    const inputData = await request.json();
    console.log(inputData);

    const uuid = generateUuid(); 

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: uuid,
          name: inputData.name,
          clerk_id: inputData.clerk_id,
          username: inputData.username || 'username',
          email: inputData.email,
          img_url: inputData.img_url, 
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ state: false, error: error.message, message: 'Failed' }, { status: 500 });
    }

    console.log('Data:', data);
    return NextResponse.json({state: false, data: data, message: "Success"}, { status: 201 });
  } catch (err) {
    console.error('Fetch Error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}
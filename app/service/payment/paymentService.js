

import supabase from '@/lib/supabase/client';
import crypto from 'crypto';



export async function checkPaymentExists(transactionId) {
  try {
    const { data: existingPayment, error: checkError } = await supabase
      .from('payments')
      .select('id')
      .eq('transaction_id', transactionId)
      .maybeSingle();

    if (checkError) {
      console.error('Supabase check error:', checkError.message);
      throw checkError; // Re-throw for caller to handle
    }

    return !!existingPayment;
  } catch (error) {
    console.error('Database checkPaymentExists error:', error);
    throw error; // Re-throw for caller to handle
  }
}

export function createPaymentData(session, userId, invoice) {
  return {
    id: crypto.randomUUID(),
    user_id: userId, // Ensure client_reference_id is set during checkout creation
    amount: (session.amount_total || 0) / 100,
    payment_provider: 'stripe',
    payment_status: session.payment_status,
    transaction_id: session.id,
    credits: 100, // Review this: Should be dynamic?
    remarks: session.metadata?.description || 'Stripe Purchase',
    customer_id: typeof session.customer === 'string' ? session.customer : null,
    invoice_id: typeof session.invoice === 'string' ? session.invoice : null,
    receipt_url: invoice?.hosted_invoice_url || null,
    payment_intent_id: typeof session.payment_intent === 'string' ? invoice?.payment_intent : null,
  };
}

export default async function savePayment(paymentData) {
  try {
    const { error: insertError } = await supabase
      .from('payments')
      .insert([paymentData]);

    console.log("insertError: ", insertError)

    if (insertError) {
      console.error('❌ Supabase insert error:', insertError.message);
      throw new Error('Failed to save payment record.');
    }

    console.log('✅ Payment record saved successfully.');
  } catch (error) {
    console.error('Database savePayment error:', error);
    throw error; // Re-throw to be handled by the caller
  }
}


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  program: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Save lead to SQLite Database
    const newLead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        program: validatedData.program,
        message: validatedData.message || '',
        status: 'PENDING',
      },
    });

    // Simulate Resend Admin notification
    console.log('\n--- [MOCK EMAIL DISPATCHER] ADMIN NOTIFICATION ---');
    console.log(`To: info@muscle-garaage.com`);
    console.log(`Subject: [NEW LEAD] VVIP Trial Booking Request - ${validatedData.name}`);
    console.log(`Body:
      Hello Admin,
      A new VVIP Free Trial has been booked through the website contact form.
      
      Lead Details:
      - Name: ${validatedData.name}
      - Phone: ${validatedData.phone}
      - Email: ${validatedData.email}
      - Preferred Program: ${validatedData.program}
      - Custom Message: ${validatedData.message || 'None provided'}
      
      Status: Saved to local Database (Lead ID: ${newLead.id}).
      Please log in to the Admin Dashboard at /admin to manage this lead.
    `);
    console.log('---------------------------------------------------\n');

    // Simulate Resend Client Auto-Reply
    console.log('\n--- [MOCK EMAIL DISPATCHER] CLIENT AUTO-REPLY ---');
    console.log(`To: ${validatedData.email}`);
    console.log(`Subject: Welcome to the Elite - Muscle Garaage VVIP Trial Confirmation`);
    console.log(`Body:
      Hi ${validatedData.name},
      
      Welcome to Muscle Garaage. Your request for a VVIP 1-Day Free Trial has been registered.
      
      Your Request Details:
      - Preferred Program: ${validatedData.program}
      
      Our concierge team will contact you at ${validatedData.phone} within the next 2 hours to confirm your custom training slot and match you with your personal trainer.
      
      Prepare to push your limits.
      
      In Strength,
      Concierge Team, Muscle Garaage
      Motera, Ahmedabad
    `);
    console.log('--------------------------------------------------\n');

    return NextResponse.json({ success: true, leadId: newLead.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed.', details: error.errors }, { status: 400 });
    }
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

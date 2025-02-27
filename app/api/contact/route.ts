import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.error('Validation Error: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Admin notification email
    await resend.emails.send({
      from: 'noreply@tsucre.com',
      to: 'tsukurou0801@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // Auto-reply email to the user
    await resend.emails.send({
      from: 'noreply@tsucre.com',
      to: email,
      subject: 'Thank you for contacting TsuCre',
      text: `Dear ${name},\n\nThank you for reaching out to TsuCre. We have received your message and will get back to you within 2 business days.\n\nBest regards,\nThe TsuCre Team`,
    });

    console.log(`Email sent successfully to ${email}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

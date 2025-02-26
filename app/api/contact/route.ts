import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification to admin
    const adminMsg = {
      to: 'tsukurou0801@gmail.com',
      from: 'noreply@tsucre.com', // Replace with your verified sender
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `,
    };

    // Send auto-reply to user
    const userMsg = {
      to: email,
      from: 'noreply@tsucre.com', // Replace with your verified sender
      subject: 'Thank you for contacting TsuCre',
      text: `
Dear ${name},

Thank you for reaching out to TsuCre. We have received your message and will get back to you within 2 business days.

Best regards,
The TsuCre Team
      `,
      html: `
<h3>Thank you for contacting TsuCre</h3>
<p>Dear ${name},</p>
<p>Thank you for reaching out to TsuCre. We have received your message and will get back to you within 2 business days.</p>
<p>Best regards,<br>The TsuCre Team</p>
      `,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(adminMsg),
      sgMail.send(userMsg)
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SendGrid Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
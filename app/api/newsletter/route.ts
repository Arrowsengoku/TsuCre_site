import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const adminMsg = {
      to: 'tsukurou0801@gmail.com',
      from: 'noreply@tsucre.com', // Replace with your verified sender
      subject: 'New Newsletter Subscription',
      text: `New newsletter subscription: ${email}`,
      html: `<p>New newsletter subscription: ${email}</p>`,
    };

    const subscriberMsg = {
      to: email,
      from: 'noreply@tsucre.com',
      subject: 'Welcome to TsuCre Newsletter',
      text: `
Thank you for subscribing to the TsuCre newsletter!
- Latest product updates
- Exclusive tester opportunities
- Special events and announcements

Best regards,
The TsuCre Team
      `,
      html: `
<h3>Welcome to TsuCre Newsletter!</h3>
<p>Thank you for subscribing to the TsuCre newsletter!</p>
<p>You'll be the first to know about:</p>
<ul>
  <li>Latest product updates</li>
  <li>Exclusive tester opportunities</li>
  <li>Special events and announcements</li>
</ul>
<p>Best regards,<br>The TsuCre Team</p>
      `,
    };

    await Promise.all([
      sgMail.send(adminMsg),
      sgMail.send(subscriberMsg)
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

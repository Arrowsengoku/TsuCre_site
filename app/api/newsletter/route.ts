import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend の API キーを環境変数から取得
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 管理者への通知メール
    const adminEmail = {
      from: 'no-reply@yourdomain.com', // Resendではカスタムドメインなしでも可
      to: 'tsukurou0801@gmail.com',
      subject: 'New Newsletter Subscription',
      text: `New newsletter subscription: ${email}`,
    };

    // ユーザーへの確認メール
    const userEmail = {
      from: 'no-reply@yourdomain.com',
      to: email,
      subject: 'Welcome to TsuCre Newsletter!',
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

    // メール送信処理
    await Promise.all([
      resend.emails.send(adminEmail),
      resend.emails.send(userEmail)
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

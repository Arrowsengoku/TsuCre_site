import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend の初期化
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // メール送信の設定
    const emailsToSend = [
      // 登録者への感謝メール
      {
        to: email,
        from: 'no-reply@tsucre.com', // 送信元アドレス（カスタムドメイン推奨）
        subject: 'Welcome to TsuCre Newsletter!',
        text: `Thank you for subscribing to the TsuCre newsletter!
You'll be the first to know about:
- Latest product updates
- Exclusive tester opportunities
- Special events and announcements

Best regards,
The TsuCre Team`,
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
      },

      // 管理者への通知メール
      {
        to: 'tsukurou0801@gmail.com',
        from: 'no-reply@tsucre.com',
        subject: 'New Newsletter Subscription',
        text: `New subscriber: ${email}`,
        html: `<p>A new user has subscribed to the TsuCre newsletter:</p>
               <p><strong>Email:</strong> ${email}</p>`,
      },
    ];

    // すべてのメールを送信
    await Promise.all(emailsToSend.map((msg) => resend.emails.send(msg)));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Resend API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.error('バリデーションエラー: 必須項目が入力されていません');
      return NextResponse.json(
        { error: '必須項目をすべて入力してください' },
        { status: 400 }
      );
    }

    // 管理者への通知メール
    await resend.emails.send({
      from: 'noreply@tsucre.com',
      to: 'tsukurou0801@gmail.com',
      subject: `【お問い合わせ】${name} さんからのメッセージ`,
      text: `名前: ${name}\nメール: ${email}\n\nメッセージ:\n${message}`,
    });

    // お客様への自動返信メール
    await resend.emails.send({
      from: 'noreply@tsucre.com',
      to: email,
      subject: '【TsuCre】お問い合わせありがとうございます',
      text: `
${name} 様

この度は TsuCre にお問い合わせいただきありがとうございます。
メッセージを受け付けました。通常2営業日以内にご返信いたしますので、しばらくお待ちください。

【お問い合わせ内容】
----------------------------
${message}
----------------------------

もし、数日経っても返信がない場合は、お手数ですが「tsukurou0801@gmail.com」までご連絡ください。

よろしくお願いいたします。
TsuCre 運営チーム
      `,
    });

    console.log(`メール送信成功: ${email}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend エラー:', error);
    return NextResponse.json(
      { error: '内部エラーが発生しました' },
      { status: 500 }
    );
  }
}

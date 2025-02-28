import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend APIキーを環境変数から取得
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'メールアドレスが必要です' },
        { status: 400 }
      );
    }
    // ここで、メールの保存処理や外部API連携を行う
    console.log("Received email:", email);

    // 管理者（あなた）へ通知メール
    const adminMsg = {
      from: 'no-reply@tsucre.com', // Resendで認証した送信元アドレス
      to: 'tsukurou0801@gmail.com', // 受信者（管理者）
      subject: '【TsuCre】新しいニュースレター登録！',
      text: `新しい購読者が登録されました: ${email}`,
      html: `<p>新しい購読者が登録されました: <strong>${email}</strong></p>`,
    };

    // 登録者への歓迎メール（日本語版）
    const subscriberMsg = {
      from: 'no-reply@tsucre.com', // Resendで認証した送信元アドレス
      to: email,
      subject: 'TsuCreメルマガへようこそ！🎮',
      text: `
こんにちは！
TsuCreメルマガにご登録いただき、ありがとうございます！✨

これから、あなたに最新情報をいち早くお届けします！

📢 こんな情報をお届け！
✅ 新商品の開発進捗や最新アップデート
✅ 限定テスター募集のお知らせ
✅ 特別イベントやお得なキャンペーン情報

ぜひ楽しみにしていてくださいね！🎉

何か気になることがあれば、お気軽にご連絡ください！

🎮 TsuCre チームより
      `,
      html: `
<h3>🎮 TsuCreメルマガへようこそ！</h3>
<p>こんにちは！</p>
<p>TsuCreメルマガにご登録いただき、ありがとうございます！✨</p>
<p>これから、あなたに <strong>最新情報</strong> をいち早くお届けします！</p>

<h4>📢 こんな情報をお届け！</h4>
<ul>
  <li>✅ 新商品の開発進捗や最新アップデート</li>
  <li>✅ 限定テスター募集のお知らせ</li>
  <li>✅ 特別イベントやお得なキャンペーン情報</li>
</ul>

<p>ぜひ楽しみにしていてくださいね！🎉</p>

<p>何か気になることがあれば、お気軽にご連絡ください！</p>

<p>🎮 <strong>TsuCre チームより</strong></p>
      `,
    };

    // 両方のメールを送信
    await Promise.all([
      resend.emails.send(adminMsg),
      resend.emails.send(subscriberMsg),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend API エラー:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


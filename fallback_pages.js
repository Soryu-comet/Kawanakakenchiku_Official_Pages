export default {
  async fetch(request, env, ctx) {
    try {
      // オリジン（Tunnel経由のサーバー）へリクエストを投げる
      const response = await fetch(request);

      // 500番台（サーバーダウン、Tunnel切断など）ならフォールバックを表示
      if (response.status >= 500) {
        return returnMaintenancePage();
      }

      // 正常ならそのまま返す
      return response;

    } catch (e) {
      // 予期せぬエラーの場合もフォールバックを表示
      return returnMaintenancePage();
    }
  }
};

// メンテナンスページのHTMLを生成する関数
function returnMaintenancePage() {
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メンテナンス中 | 川中建築</title>
  <meta name="description" content="川中建築の公式サイトは現在メンテナンス中です。お急ぎの方はお電話またはメールにてお問い合わせください。">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap&font-display=swap" rel="stylesheet">
  <style>
    :root {
      --brand-green: #2c4c3b;
      --brand-orange: #c85a17;
      --brand-dark: #222222;
      --brand-gray: #525252;
      --brand-light: #f9f8f6;
    }
    * {
      box-sizing: border-box;
    }
    body {
      background-color: var(--brand-light);
      color: var(--brand-dark);
      font-family: 'Zen Kaku Gothic New', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      text-align: center;
      line-height: 1.8;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, .font-serif {
      font-family: 'Shippori Mincho', serif;
    }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5rem 1.5rem;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    .logo {
      margin-bottom: 3rem;
    }
    .logo-text {
      font-family: 'Shippori Mincho', serif;
      font-size: 1.8rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-indent: 0.15em;
      color: var(--brand-dark);
      text-decoration: none;
    }
    .status-code {
      font-size: 0.8rem;
      color: var(--brand-orange);
      font-weight: 700;
      letter-spacing: 0.2em;
      text-indent: 0.2em;
      margin-bottom: 1.5rem;
    }
    .title {
      font-size: 2.2rem;
      font-weight: 500;
      margin-bottom: 2rem;
      line-height: 1.4;
      letter-spacing: 0.05em;
      text-indent: 0.05em;
    }
    .message {
      color: var(--brand-gray);
      max-width: 600px;
      margin-bottom: 4rem;
      font-size: 0.95rem;
      letter-spacing: 0.05em;
      line-height: 2.2;
      overflow-wrap: break-word;
    }
    .contact-info {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 1.5rem;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
      max-width: 450px;
      width: 100%;
      border-top: 4px solid var(--brand-green);
    }
    .contact-info h3 {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: var(--brand-dark);
      letter-spacing: 0.1em;
    }
    .contact-info p {
      margin: 0.5rem 0;
      color: var(--brand-gray);
      font-size: 0.9rem;
      letter-spacing: 0.05em;
    }
    .contact-info .hours {
      font-size: 0.85rem;
      color: var(--brand-orange);
      font-weight: 500;
      margin-top: 1rem;
    }
    .contact-info .tel {
      font-family: 'Shippori Mincho', serif;
      font-size: 1.5rem;
      color: var(--brand-dark);
      display: block;
      margin-top: 0.2rem;
      text-decoration: none;
      padding: 0.5rem; /* Touch target size */
    }
    
    .email-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.8rem;
      flex-wrap: wrap;
    }
    .contact-info .email {
      color: var(--brand-green);
      font-size: 0.9rem;
      font-weight: 500;
      text-decoration: none;
      letter-spacing: 0.05em;
      word-break: break-all;
      padding: 0.5rem 0;
    }
    .copy-btn {
      background: #f0f0f0;
      border: none;
      border-radius: 0.4rem;
      padding: 0.4rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      color: var(--brand-gray);
      min-width: 44px; /* PSI Accessibility requirement */
      min-height: 44px;
    }
    .copy-btn:hover {
      background: #e5e5e5;
      color: var(--brand-dark);
    }
    .copy-btn:active {
      transform: scale(0.95);
    }
    .copy-btn svg {
      width: 1.1rem;
      height: 1.1rem;
    }
    .tooltip {
      position: absolute;
      background: var(--brand-dark);
      color: white;
      font-size: 0.7rem;
      padding: 0.3rem 0.6rem;
      border-radius: 0.3rem;
      bottom: 110%;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    .copy-btn-container {
      position: relative;
    }
    
    footer {
      padding: 2.5rem 2rem;
      background: var(--brand-dark);
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.7rem;
      letter-spacing: 0.2em;
    }
    
    .md-hidden {
      display: none;
    }

    @media (max-width: 768px) {
      main {
        padding: 4rem 1.25rem;
        justify-content: flex-start;
      }
      .logo { margin-bottom: 2rem; }
      .logo-text { font-size: 1.4rem; }
      .title { font-size: 1.5rem; margin-bottom: 1.5rem; }
      .message { font-size: 0.85rem; margin-bottom: 3rem; line-height: 2; }
      .contact-info { padding: 2rem 1.25rem; }
      .contact-info .tel { font-size: 1.3rem; }
      .md-hidden { display: inline; }
    }
  </style>
</head>
<body>
<main>
  <div class="logo">
    <div class="logo-text">川中建築</div>
  </div>

  <div class="status-code" aria-label="ステータス：システムメンテナンス 503">SYSTEM MAINTENANCE / 503</div>

  <h1 class="title font-serif">ただいま、<br class="md-hidden">メンテナンス中です。</h1>

  <p class="message">
    いつも川中建築をご愛顧いただき、誠にありがとうございます。<br>
    現在、サーバーのメンテナンスまたはシステム調整を行っております。<br>
    ご不便をおかけして申し訳ございませんが、<br>
    しばらく経ってから再度アクセスをお願いいたします。
  </p>

  <section class="contact-info" aria-labelledby="contact-heading">
    <h3 id="contact-heading" class="font-serif">お急ぎのご用件はこちら</h3>
    <p>兵庫県豊岡市城崎町来日710-1</p>
    <p class="hours">受付時間：8:00 〜 17:00（日・祝除く）</p>
    <a href="tel:0796322264" class="tel" aria-label="電話番号：0796-32-2264">0796-32-2264</a>
    <div class="email-wrapper">
      <a href="mailto:contact@kawanakakenchiku.com" class="email" id="email-link">contact@kawanakakenchiku.com</a>
      <div class="copy-btn-container">
        <button class="copy-btn" id="copy-btn" title="メールアドレスをコピー" aria-label="メールアドレスをコピー">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <span class="tooltip" id="copy-tooltip">コピーしました</span>
        </button>
      </div>
    </div>
  </section>
</main>

<footer>
  &copy; 2026 KAWANAKA KENCHIKU. ALL RIGHTS RESERVED.
</footer>

<script>
  document.getElementById('copy-btn').addEventListener('click', function() {
    const email = document.getElementById('email-link').innerText;
    navigator.clipboard.writeText(email).then(function() {
      const tooltip = document.getElementById('copy-tooltip');
      tooltip.style.opacity = '1';
      setTimeout(function() {
        tooltip.style.opacity = '0';
      }, 2000);
    }).catch(function(err) {
      console.error('コピーに失敗しました', err);
    });
  });
</script>
</body>
</html>`;

  // HTTPステータス503 (Service Unavailable) としてレスポンスを返す
  return new Response(html, {
    status: 503,
    headers: {
      "Content-Type": "text/html;charset=UTF-8"
    }
  });
}
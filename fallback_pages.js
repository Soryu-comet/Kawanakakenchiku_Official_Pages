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
  <meta name="theme-color" content="#f9f8f6">
  
  <!-- Webフォントの非同期読み込み（レンダリングブロック回避） -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap" media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap">
  </noscript>

  <style>
    :root {
      --brand-green: #2c4c3b;
      /* コントラスト比の基準をクリアするため、少しだけ明度を落としたオレンジ */
      --brand-orange: #a84b18; 
      --brand-dark: #222222;
      --brand-gray: #525252;
      --brand-light: #f9f8f6;
    }
    * {
      box-sizing: border-box;
    }
    html, body {
      height: 100%;
    }
    body {
      background-color: var(--brand-light);
      color: var(--brand-dark);
      font-family: 'Zen Kaku Gothic New', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
      overflow-y: auto;
      overflow-x: hidden;
      text-align: center;
      line-height: 1.8;
      -webkit-font-smoothing: antialiased;

      /* スクロールバーの非表示化（スクロール機能は維持） */
      -ms-overflow-style: none; /* IE, Edge */
      scrollbar-width: none; /* Firefox */
    }
    body::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
    
    h1, h2, .font-serif {
      font-family: 'Shippori Mincho', serif;
    }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4rem 1.5rem;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    .logo {
      margin-bottom: 2.5rem;
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
      margin-bottom: 3.5rem;
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
    .contact-info h2 {
      font-size: 1.1rem;
      font-weight: 500;
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
    
    /* 連絡先アイテム（テキストとボタンの並び） */
    .contact-item-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      margin-top: 0.8rem;
      flex-wrap: wrap;
    }

    .contact-info .tel {
      font-family: 'Shippori Mincho', serif;
      font-size: 1.5rem;
      color: var(--brand-dark);
      display: block;
      margin-top: 0.2rem;
      padding: 0.25rem 0.5rem;
    }
    
    .contact-info .email {
      color: var(--brand-green);
      font-size: 0.9rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      word-break: break-all;
      padding: 0.25rem 0.5rem;
    }
    
    /* コピーボタンの洗練（コンセプトに合わせて透明・シンプルに） */
    .copy-btn {
      background: transparent;
      border: none;
      border-radius: 50%; /* 丸くして上品に */
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      color: #999;
      min-width: 44px;
      min-height: 44px;
      outline: none;
    }
    .copy-btn:hover, .copy-btn:focus-visible {
      background: rgba(44, 76, 59, 0.08); /* ホバー時にブランドグリーンを薄く敷く */
      color: var(--brand-green);
    }
    .copy-btn:active {
      transform: scale(0.9);
    }
    .copy-btn svg {
      width: 1.1rem;
      height: 1.1rem;
    }
    .copy-btn-container {
      position: relative;
    }
    .tooltip {
      position: absolute;
      background: var(--brand-dark);
      color: white;
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
      border-radius: 0.3rem;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap; /* 縦長バグ防止 */
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      pointer-events: none;
      z-index: 10;
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 4px;
      border-style: solid;
      border-color: var(--brand-dark) transparent transparent transparent;
    }
    .tooltip.show {
      opacity: 1;
      visibility: visible;
    }
    
    footer {
      padding: 1.5rem 2rem;
      background: var(--brand-dark);
      color: #a3a3a3; /* コントラスト比改善 */
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      width: 100%;
      margin-top: auto;
    }
    
    .md-hidden {
      display: none;
    }

    /* レスポンシブ対応 */
    @media (max-width: 768px) {
      main {
        padding: 3rem 1.25rem;
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
    <h2 id="contact-heading" class="font-serif">お急ぎのご用件はこちら</h2>
    <p>兵庫県豊岡市城崎町来日710-1</p>
    <p class="hours">受付時間：8:00 〜 17:00（日・祝除く）</p>
    
    <!-- 電話番号エリア -->
    <div class="contact-item-wrapper">
      <span class="tel" id="tel-text" aria-label="電話番号：0796-32-2264">0796-32-2264</span>
      <div class="copy-btn-container">
        <button class="copy-btn" onclick="copyText('tel-text', this)" title="電話番号をコピー" aria-label="電話番号をコピー">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <span class="tooltip">コピーしました</span>
        </button>
      </div>
    </div>

    <!-- メールアドレスエリア -->
    <div class="contact-item-wrapper">
      <span class="email" id="email-text">contact@kawanakakenchiku.com</span>
      <div class="copy-btn-container">
        <button class="copy-btn" onclick="copyText('email-text', this)" title="メールアドレスをコピー" aria-label="メールアドレスをコピー">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <span class="tooltip">コピーしました</span>
        </button>
      </div>
    </div>
  </section>
</main>

<footer>
  &copy; 2026 KAWANAKA KENCHIKU. ALL RIGHTS RESERVED.
</footer>

<script>
  function copyText(elementId, btnElement) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function() {
      const tooltip = btnElement.querySelector('.tooltip');
      
      document.querySelectorAll('.tooltip.show').forEach(function(el) {
        if(el !== tooltip) el.classList.remove('show');
      });

      tooltip.classList.add('show');
      
      setTimeout(function() {
        tooltip.classList.remove('show');
      }, 2000);
    }).catch(function(err) {
      console.error('コピーに失敗しました', err);
      alert('コピーに失敗しました。');
    });
  }
</script>
</body>
</html>`;

  // HTTPステータス503 (Service Unavailable) としてレスポンスを返す
  return new Response(html, {
    status: 503,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Retry-After": "3600",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
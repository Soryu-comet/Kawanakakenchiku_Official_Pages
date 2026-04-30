export default {
  async fetch(request, env, ctx) {
    try {
      const response = await fetch(request);
      if (response.status >= 500) {
        return returnMaintenancePage();
      }
      return response;
    } catch (e) {
      return returnMaintenancePage();
    }
  }
};

function returnMaintenancePage() {
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メンテナンス中 | 川中建築</title>
  <meta name="description" content="川中建築の公式サイトは現在メンテナンス中です。お急ぎの方はお電話またはメールにてお問い合わせください。">
  <meta name="theme-color" content="#f9f8f6">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap&text=%200123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@%23$%25^%26*()_%2B-=[]{}|;':%22,./<>?©〜、。・（）あいうおかがきくけごさざしすせぞただちっつてでとなにねのはばまもらりるわをんアイクコサシスセテトナバピメムンール川中建築公式現在急方電話問合誠愛顧調整行不便申訳経再度願致用件兵庫県豊岡市城崎町来日受付時間祝除失敗">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap&text=%200123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@%23$%25^%26*()_%2B-=[]{}|;':%22,./<>?©〜、。・（）あいうおかがきくけごさざしすせぞただちっつてでとなにねのはばまもらりるわをんアイクコサシスセテトナバピメムンール川中建築公式現在急方電話問合誠愛顧調整行不便申訳経再度願致用件兵庫県豊岡市城崎町来日受付時間祝除失敗" media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap&text=%200123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@%23$%25^%26*()_%2B-=[]{}|;':%22,./<>?©〜、。・（）あいうおかがきくけごさざしすせぞただちっつてでとなにねのはばまもらりるわをんアイクコサシスセテトナバピメムンール川中建築公式現在急方電話問合誠愛顧調整行不便申訳経再度願致用件兵庫県豊岡市城崎町来日受付時間祝除失敗">
  </noscript>

  <style>
    :root{--brand-green:#2c4c3b;--brand-orange:#a84b18;--brand-dark:#222;--brand-gray:#525252;--brand-light:#f9f8f6}*{box-sizing:border-box}html{height:100%}body{background-color:var(--brand-light);color:var(--brand-dark);font-family:'Zen Kaku Gothic New',sans-serif;margin:0;padding:0;display:flex;flex-direction:column;min-height:100vh;min-height:100dvh;text-align:center;line-height:1.8;-webkit-font-smoothing:antialiased}h1,h2,.font-serif{font-family:'Shippori Mincho',serif}main{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:3rem 1.5rem;width:100%;max-width:800px;margin:0 auto}.logo{margin-bottom:2.5rem}.logo-text{font-family:'Shippori Mincho',serif;font-size:1.8rem;font-weight:500;letter-spacing:.15em;text-indent:.15em;color:var(--brand-dark);text-decoration:none}.status-code{font-size:.8rem;color:var(--brand-orange);font-weight:700;letter-spacing:.2em;text-indent:.2em;margin-bottom:1.5rem}.title{font-size:2.2rem;font-weight:500;margin-bottom:2rem;line-height:1.4;letter-spacing:.05em;text-indent:.05em}.message{color:var(--brand-gray);max-width:600px;margin-bottom:3.5rem;font-size:.95rem;letter-spacing:.05em;line-height:2.2;overflow-wrap:break-word}.contact-info{background:#fff;padding:2.5rem 2rem;border-radius:1.5rem;box-shadow:0 20px 40px -15px rgba(0,0,0,0.05);max-width:450px;width:100%;border-top:4px solid var(--brand-green)}.contact-info h2{font-size:1.1rem;font-weight:500;margin-top:0;margin-bottom:1.5rem;color:var(--brand-dark);letter-spacing:.1em}.contact-info p{margin:.5rem 0;color:var(--brand-gray);font-size:.9rem;letter-spacing:.05em}.contact-info .hours{font-size:.85rem;color:var(--brand-orange);font-weight:500;margin-top:1rem}.contact-item-wrapper{display:flex;align-items:center;justify-content:center;gap:.25rem;margin-top:.5rem;flex-wrap:wrap}.contact-info .tel{font-family:'Shippori Mincho',serif;font-size:1.5rem;color:var(--brand-dark);display:block;padding:.25rem .5rem}.contact-info .email{color:var(--brand-green);font-size:.9rem;font-weight:500;letter-spacing:.05em;word-break:break-all;padding:.25rem .5rem}.copy-btn{background:transparent;border:none;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease;color:#999;min-width:44px;min-height:44px;outline:none;margin:0;padding:0;transform:translateY(1px)}.copy-btn:hover,.copy-btn:focus-visible{background:rgba(44,76,59,0.08);color:var(--brand-green)}.copy-btn:active{transform:translateY(1px) scale(.9)}.copy-btn svg{width:1.1rem;height:1.1rem}.copy-btn-container{position:relative;display:flex;align-items:center}.tooltip{position:absolute;background:var(--brand-dark);color:#fff;font-size:.75rem;padding:.4rem .8rem;border-radius:.3rem;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);white-space:nowrap;opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s;pointer-events:none;z-index:10}.tooltip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border-width:4px;border-style:solid;border-color:var(--brand-dark) transparent transparent transparent}.tooltip.show{opacity:1;visibility:visible}footer{padding:1.5rem 2rem;background:var(--brand-dark);color:#a3a3a3;font-size:.75rem;letter-spacing:.15em;width:100%;margin-top:auto}.md-br{display:none}@media (max-width:768px){main{padding:2rem 1.25rem;justify-content:flex-start}.logo{margin-bottom:2rem}.logo-text{font-size:1.4rem}.title{font-size:1.5rem;margin-bottom:1.5rem}.message{font-size:.85rem;margin-bottom:3rem;line-height:2}.contact-info{padding:2rem 1.25rem}.contact-info .tel{font-size:1.3rem}.md-br{display:block}}
  </style>
</head>
<body>
<main>
  <div class="logo"><div class="logo-text">川中建築</div></div>
  <div class="status-code" aria-label="ステータス：システムメンテナンス 503">SYSTEM MAINTENANCE / 503</div>
  <h1 class="title font-serif">ただいま、<br class="md-br">メンテナンス中です。</h1>
  <p class="message">
    いつも川中建築をご愛顧いただき、<br class="md-br">誠にありがとうございます。<br>
    現在、サーバーのメンテナンスまたは<br class="md-br">システム調整を行っております。<br>
    ご不便をおかけして申し訳ございませんが、<br>
    しばらく経ってから再度アクセスをお願いいたします。
  </p>
  <section class="contact-info" aria-labelledby="contact-heading">
    <h2 id="contact-heading" class="font-serif">お急ぎのご用件はこちら</h2>
    <p>兵庫県豊岡市城崎町来日710-1</p>
    <p class="hours">受付時間：8:00 〜 17:00（日・祝除く）</p>
    <div class="contact-item-wrapper">
      <span class="tel" id="tel-text" aria-label="電話番号：0796-32-2264">0796-32-2264</span>
      <div class="copy-btn-container">
        <button class="copy-btn" onclick="copyText('tel-text', this)" title="電話番号をコピー" aria-label="電話番号をコピー">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
          <span class="tooltip">コピーしました</span>
        </button>
      </div>
    </div>
    <div class="contact-item-wrapper">
      <span class="email" id="email-text">contact@kawanakakenchiku.com</span>
      <div class="copy-btn-container">
        <button class="copy-btn" onclick="copyText('email-text', this)" title="メールアドレスをコピー" aria-label="メールアドレスをコピー">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
          <span class="tooltip">コピーしました</span>
        </button>
      </div>
    </div>
  </section>
</main>
<footer>&copy; 2026 KAWANAKA KENCHIKU. ALL RIGHTS RESERVED.</footer>
<script>
  function copyText(e,t){const n=document.getElementById(e).innerText;navigator.clipboard.writeText(n).then((function(){const e=t.querySelector(".tooltip");document.querySelectorAll(".tooltip.show").forEach((function(t){t!==e&&t.classList.remove("show")})),e.classList.add("show"),setTimeout((function(){e.classList.remove("show")}),2e3)})).catch((function(e){console.error("コピーに失敗しました",e),alert("コピーに失敗しました。")}))}
</script>
</body>
</html>`;

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
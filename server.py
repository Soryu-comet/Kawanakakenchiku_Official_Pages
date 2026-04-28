import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import requests
from flask import Flask, request, jsonify, send_from_directory, render_template
from waitress import serve
from dotenv import load_dotenv

# .env ファイルを読み込み
load_dotenv()

# テンプレートフォルダをカレントディレクトリに設定
app = Flask(__name__, static_folder='public/static', template_folder='public')
PORT = 8132
PUBLIC_DIR = 'public' 


# ご要件の表示名マッピング
SUBJECT_MAP = {
    "general": "一般的なご質問",
    "stove": "ペレットストーブ見学・導入相談",
    "pellet": "ペレット燃料・着火材のご注文",
    "renovation": "新築・リフォーム・電気工事のお見積り"
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact.html')
def contact_page():
    site_key = os.environ.get("TURNSTILE_SITE_KEY", "1x00000000000000000000AA")
    return render_template('contact.html', TURNSTILE_SITE_KEY=site_key)

@app.route('/<path:filename>')
def serve_file(filename):
    if os.path.exists(os.path.join(PUBLIC_DIR, filename)):
        return send_from_directory(PUBLIC_DIR, filename)
    return "Not Found", 404

# /api/contact エンドポイント
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        # FormDataの取得
        name = request.form.get('name')
        email = request.form.get('email')
        subject_key = request.form.get('subject')
        message = request.form.get('message')
        turnstile_token = request.form.get('cf-turnstile-response')
        
        # ご要件を日本語に変換
        subject_display = SUBJECT_MAP.get(subject_key, subject_key)
        
        if not turnstile_token:
            return jsonify({"status": "error", "message": "CAPTCHA verification is missing."}), 400

        # Turnstileの検証
        secret_key = os.environ.get("TURNSTILE_SECRET_KEY")
        if secret_key and not secret_key.startswith("1x00"):
            verify_url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
            res = requests.post(verify_url, data={
                "secret": secret_key,
                "response": turnstile_token,
                "remoteip": request.remote_addr
            })
            if not res.json().get("success"):
                return jsonify({"status": "error", "message": "CAPTCHA validation failed."}), 400

        # --- メール送信ロジック (Gmail SMTP) ---
        smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", 587))
        smtp_user = os.environ.get("SMTP_USER")
        smtp_password = os.environ.get("SMTP_PASSWORD")
        to_email = os.environ.get("TO_EMAIL")

        if not all([smtp_user, smtp_password, to_email]):
            return jsonify({"status": "error", "message": "Mail server configuration is missing."}), 500

        # 送信するメールの構築
        msg = MIMEMultipart()
        msg['From'] = formataddr(("川中建築 お問い合わせフォーム", smtp_user))
        msg['To'] = to_email
        msg['Subject'] = f"【HP問合せ】{name} 様（{subject_display}）"
        msg['Reply-To'] = email

        # 見やすいテンプレートに変更
        body = f"""
川中建築 ホームページから新しいお問い合わせが届きました。
内容を確認の上、対応をお願いいたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お問い合わせ内容
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【お名前】
{name} 様

【メールアドレス】
{email}

【ご用件】
{subject_display}

【メッセージ詳細】
{message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※このメールはホームページのお問い合わせフォームより自動送信されています。
※返信先は自動でお客様のメールアドレス({email})に送信されます。万が一違った場合は
手動修正してください。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
        msg.attach(MIMEText(body, 'plain', 'utf-8'))

        # SMTPサーバーに接続して送信
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return jsonify({"status": "success", "message": "ok"})
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.after_request
def add_security_headers(response):
    
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    
    if os.environ.get("APP_ENV") != "production":
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    print(f"Serving at port {PORT}")
    serve(app, host='0.0.0.0', port=PORT, threads=6)
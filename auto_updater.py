import subprocess
import time
import datetime
import sys

# 実行するサーバーファイル名
SERVER_FILE = "server.py"

def run_git_pull():
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] git pull origin mainを実行します...")
    try:
        # 確実に origin の main ブランチからpullするように明示
        result = subprocess.run(["git", "pull", "origin", "main"], capture_output=True, text=True, check=True)
        print(result.stdout)
        print("git pullが完了しました。")
    except subprocess.CalledProcessError as e:
        print(f"git pullに失敗しました...\nエラー内容:\n{e.stderr}")

def run_npm_build():
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] npm run buildを実行します...")
    try:
        # Windows環境を考慮し shell=True を使用
        result = subprocess.run("npm run build", shell=True, capture_output=True, text=True, check=True)
        print(result.stdout)
        print("npm run buildが完了しました。")
    except subprocess.CalledProcessError as e:
        print(f"npm run buildに失敗しました...\nエラー内容:\n{e.stderr}")

def get_seconds_until_next_run():
    now = datetime.datetime.now()
    # 今日の12:00
    noon = now.replace(hour=12, minute=0, second=0, microsecond=0)
    # 明日の0:00
    midnight = (now + datetime.timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)

    # 現在時刻と比較して、直近のターゲット時刻を決定
    if now < noon:
        target = noon
    else:
        target = midnight
        
    return (target - now).total_seconds()

def main():
    print("自動git pull & サーバー再起動botを起動しました！")
    
    # 初回のサーバー起動
    # sys.executable を使うことで、このbotを実行しているのと同じPython環境で起動させます
    server_process = subprocess.Popen([sys.executable, SERVER_FILE])
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] サーバー({SERVER_FILE})を起動しました。")

    try:
        while True:
            wait_seconds = get_seconds_until_next_run()
            target_time = datetime.datetime.now() + datetime.timedelta(seconds=wait_seconds)
            print(f"次の自動更新は {target_time.strftime('%Y-%m-%d %H:%M:%S')} に実行されます。")

            # ターゲット時刻まで待機しつつ、サーバープロセスの死活監視を行う
            while datetime.datetime.now() < target_time:
                # プロセスが終了していないかチェック
                if server_process.poll() is not None:
                    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] サーバープロセスが予期せず終了しました。再起動します...")
                    server_process = subprocess.Popen([sys.executable, SERVER_FILE])
                
                # 1秒ごとにチェック
                time.sleep(1)

            # 待機明けに git pull 実行
            run_git_pull()
            
            # 続いて npm run build 実行
            run_npm_build()

            # サーバーの再起動処理
            print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] サーバーを再起動します...")
            
            # プロセスがまだ動いていれば終了させる
            if server_process.poll() is None:
                server_process.terminate()
                try:
                    # 安全に終了するまで最大10秒待機
                    server_process.wait(timeout=10)
                except subprocess.TimeoutExpired:
                    # 終了しなかった場合は強制終了
                    server_process.kill()
            
            # 新しいコードで再びサーバーを起動
            server_process = subprocess.Popen([sys.executable, SERVER_FILE])
            print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] サーバーを再起動完了しました。")
            
    except KeyboardInterrupt:
        print("\n[Ctrl+C] botを終了します。")
    finally:
        # スクリプト終了時にサーバープロセスも確実に終了させる
        if 'server_process' in locals() and server_process.poll() is None:
            print("サーバープロセスを終了しています...")
            server_process.terminate()
            try:
                server_process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                server_process.kill()
            print("サーバープロセスを完全に終了しました。")

if __name__ == "__main__":
    main()
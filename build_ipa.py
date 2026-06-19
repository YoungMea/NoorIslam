#!/usr/bin/env python3

import pty
import os
import sys
import select
import time
import re

APPLE_ID = "shahnozaabdunasimova@gmail.com"
APPLE_PASSWORD = "Beki_2006"
TIMEOUT = 600  # 10 minutes total

def main():
    print("Starting iOS IPA build via EAS...")
    sys.stdout.flush()
    
    master_fd, slave_fd = pty.openpty()
    
    proc_pid = os.fork()
    
    if proc_pid == 0:
        # Child process
        os.close(master_fd)
        os.setsid()
        os.dup2(slave_fd, 0)
        os.dup2(slave_fd, 1)
        os.dup2(slave_fd, 2)
        if slave_fd > 2:
            os.close(slave_fd)
        
        os.environ['TERM'] = 'xterm-256color'
        os.chdir('/home/youngmea/noor_islam')
        os.execvp('eas', ['eas', 'build', '--platform', 'ios', '--profile', 'development'])
    
    # Parent process
    os.close(slave_fd)
    
    output = ""
    start_time = time.time()
    apple_id_sent = False
    password_sent = False
    auto_submit = False
    
    try:
        while True:
            elapsed = time.time() - start_time
            if elapsed > TIMEOUT:
                print(f"\nTimeout after {TIMEOUT} seconds")
                os.write(master_fd, b"\x03")  # Ctrl+C
                break
            
            r, w, e = select.select([master_fd], [], [], 1.0)
            
            if r:
                try:
                    data = os.read(master_fd, 4096).decode('utf-8', errors='replace')
                    output += data
                    print(data, end='', flush=True)
                    
                    # Check for Apple ID prompt
                    if not apple_id_sent and re.search(r'Apple\s*ID|apple\s*id|email|Username|username|E-mail', data, re.IGNORECASE):
                        time.sleep(1)
                        os.write(master_fd, (APPLE_ID + '\n').encode())
                        apple_id_sent = True
                        print(f"\n[Auto] Sent Apple ID...\n")
                    
                    # Check for password prompt
                    if apple_id_sent and not password_sent and re.search(r'Password|password|Passphrase|passphrase', data, re.IGNORECASE):
                        time.sleep(1)
                        os.write(master_fd, (APPLE_PASSWORD + '\n').encode())
                        password_sent = True
                        print(f"\n[Auto] Sent password...\n")
                    
                    # Check for "Yes/No" prompts - always answer Yes
                    if re.search(r'\(y/N\)|\(Y/n\)|\[y/N\]|\[Y/n\]', data):
                        time.sleep(1)
                        os.write(master_fd, b'y\n')
                        print(f"\n[Auto] Answered 'y'\n")
                    
                    # Check for selection prompts (numbers)
                    if re.search(r'Select\s+.*\[', data) or re.search(r'>\s*\d+', data):
                        time.sleep(1)
                        os.write(master_fd, b'1\n')
                        print(f"\n[Auto] Selected option 1\n")
                    
                    # Handle "Would you like to continue" type prompts
                    if re.search(r'continue|proceed|submit', data, re.IGNORECASE) and re.search(r'\(y/N\)|\(Y/n\)', data):
                        time.sleep(1)
                        os.write(master_fd, b'y\n')
                        print(f"\n[Auto] Confirmed continue\n")
                    
                    # Handle "auto-submit" prompt - Expo sometimes asks if you want to wait for build
                    if re.search(r'auto.?submit|Would you like to.*wait', data, re.IGNORECASE):
                        if not auto_submit:
                            time.sleep(1)
                            os.write(master_fd, b'y\n')
                            auto_submit = True
                            print(f"\n[Auto] Auto-submit enabled\n")
                    
                    # Check if build was successful or errored
                    if re.search(r'Build complete|Build finished|Build failed|Error|✖', data):
                        # Build ended or errored
                        if re.search(r'https://expo\.dev/artifacts', data):
                            print(f"\n✅ IPA build completed! Download URL found in logs above.\n")
                        break
                    
                    # Check for build URL
                    if re.search(r'https://expo\.dev/accounts/.*?/builds/', data):
                        match = re.search(r'https://expo\.dev/accounts/[^\s]+', data)
                        if match:
                            print(f"\n🔗 Build URL: {match.group(0)}\n")
                    
                except (OSError, IOError) as e:
                    print(f"\nRead error: {e}")
                    break
            
            # Check if child process is still alive
            wpid, status = os.waitpid(proc_pid, os.WNOHANG)
            if wpid != 0:
                print(f"\nProcess exited with status {status}")
                break
    
    except KeyboardInterrupt:
        os.write(master_fd, b"\x03")
    finally:
        os.close(master_fd)
        os.waitpid(proc_pid, 0)

    # Print final output summary
    print("\n" + "="*60)
    print("BUILD SESSION ENDED")
    print("="*60)

if __name__ == "__main__":
    main()

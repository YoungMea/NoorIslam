#!/usr/bin/env python3
"""
EAS iOS Build script with interactive 2FA handling using pexpect.
This script runs 'eas build --platform ios --profile development' interactively
and handles the Apple ID credentials and 2FA prompts.
"""

import pexpect
import sys
import os
import re
import json
import subprocess

APPLE_ID = "shahnozaabdunasimova@gmail.com"
APPLE_PASSWORD = "Beki_2006"
PROJECT_DIR = "/home/youngmea/noor_islam"

def run_eas_build():
    """Run eas build for iOS and handle interactive prompts."""
    
    print("=" * 60)
    print("Starting EAS iOS Build with interactive handling")
    print("=" * 60)
    
    # Change to project directory
    os.chdir(PROJECT_DIR)
    
    # Start the eas build process
    cmd = "eas build --platform ios --profile preview"
    
    # Set environment variables for Apple ID
    env = os.environ.copy()
    env["EXPO_APPLE_ID"] = APPLE_ID
    env["EXPO_APPLE_PASSWORD"] = APPLE_PASSWORD
    
    print(f"Running: {cmd}")
    print(f"Apple ID: {APPLE_ID}")
    
    # Start the process with pexpect
    child = pexpect.spawn(cmd, env=env, timeout=600, encoding='utf-8', codec_errors='replace')
    child.logfile = sys.stdout
    
    try:
        # Pattern matching for various prompts
        patterns = [
            'Apple ID',
            'password',
            'verification code',
            'two-factor authentication',
            '6-digit code',
            'Enter the code',
            'code you received',
            'distribution',
            'internal distribution',
            'Would you like to',
            'Choose',
            'Select',
            'credentials',
            'proceed',
            'continue',
            pexpect.EOF,
            pexpect.TIMEOUT,
        ]
        
        while True:
            index = child.expect(patterns, timeout=120)
            
            if index == 0:  # Apple ID prompt
                child.sendline(APPLE_ID)
                print("\n[SENT] Apple ID")
            elif index == 1:  # password prompt
                child.sendline(APPLE_PASSWORD)
                print("\n[SENT] Password")
            elif index in [2, 3, 4, 5, 6]:  # 2FA code prompt
                code = input("\n[2FA REQUIRED] Apple 2FA kodingizni kiriting: ")
                child.sendline(code.strip())
                print(f"\n[SENT] 2FA code: {code.strip()}")
            elif index == 7:  # distribution prompt
                child.sendline("y")
                print("\n[SENT] Yes to distribution")
            elif index in [8, 9, 10]:  # selection prompts
                child.sendline("y")
                print("\n[SENT] Yes/Confirm")
            elif index in [11, 12, 13]:  # credentials/continue prompts
                child.sendline("y")
                print("\n[SENT] Yes/Confirm")
            elif index == 14:  # EOF
                print("\n[EOF] Process completed")
                break
            elif index == 15:  # TIMEOUT
                # Print what we have so far
                before = child.before[-500:] if child.before else ""
                print(f"\n[TIMEOUT] Last output: {before}")
                # Try to get more output
                try:
                    child.sendline("")
                except:
                    pass
                break
            
            # Check if build ID appeared in output
            output = child.before or ""
            if "Build ID" in output or "https://expo.dev" in output:
                # Try to extract build URL
                url_match = re.search(r'https://expo\.dev[^\s]+', output)
                if url_match:
                    print(f"\n\n{'=' * 60}")
                    print(f"BUILD URL: {url_match.group(0)}")
                    print(f"{'=' * 60}\n")
        
        # Print remaining output
        try:
            remaining = child.read()
            if remaining:
                print(f"\n[REMAINING OUTPUT]:\n{remaining}")
        except:
            pass
        
        # Try to get the build ID from the output
        all_output = child.before or "" + (child.after or "")
        
        # Check for build URLs
        urls = re.findall(r'https://expo\.dev/[^\s]+', all_output)
        if urls:
            print(f"\n{'=' * 60}")
            print(f"BUILD URL(s): {urls}")
            print(f"{'=' * 60}")
            
            # Save build URL to file
            with open('/tmp/ios_build_url.txt', 'w') as f:
                f.write(urls[0])
            
            print(f"\nBuild URL saved to /tmp/ios_build_url.txt")
        
        print(f"\n{'=' * 60}")
        print("Build process completed. Check output above for results.")
        print(f"{'=' * 60}")
        
    except pexpect.EOF:
        print(f"\n[EOF - Unexpected] Process ended unexpectedly")
        print(f"Last output: {child.before[-500:] if child.before else 'None'}")
    except pexpect.TIMEOUT:
        print(f"\n[TIMEOUT] Process timed out")
        print(f"Last output: {child.before[-500:] if child.before else 'None'}")
    except Exception as e:
        print(f"\n[ERROR] {str(e)}")
        print(f"Last output: {child.before[-500:] if child.before else 'None'}")
    finally:
        child.close()
        print(f"\nExit code: {child.exitstatus}")
        print("Done.")

if __name__ == "__main__":
    run_eas_build()

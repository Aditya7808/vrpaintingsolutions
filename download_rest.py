import requests
import os
import time

files = {
    "WhatsApp Image 2026-09-24 at 11.56.31 PM - Copy.jpeg": "1UVsKMoMPP14usO8zz0Cu_NiVM1iY3bmw",
    "WhatsApp Image 2026-09-24 at 11.56.31 PM.jpeg": "1oBI977xr4Dk2WMMhWYE-fABkDIXj_L8Y",
    "WhatsApp Image 2026-09-24 at 11.56.32 PM.jpeg": "1LNkNyQjipsgXBufwr9w6iANmKy1CEEPE",
    "WhatsApp Image 2026-09-24 at 11.56.33 PM.jpeg": "19bC6XYxgxfYIGWYXygq3A5G-O0nqZnTc",
    "WhatsApp Image 2026-09-24 at 11.56.34 PM.jpeg": "1EXYe_m-gSYQ2xJ7qno4hJy0hEzQ_mf3G",
    "WhatsApp Image 2026-09-24 at 11.56.36 PM.jpeg": "1iCQQYJG3wdVuxSzWyuU-zUYtsbjD5mQF",
    "WhatsApp Image 2026-09-24 at 11.56.37 PM.jpeg": "1ca-VvJ5MnfFF0xDnUGMjMOmtuAbiBgUl",
    "WhatsApp Image 2026-09-24 at 11.57.18 PM.jpeg": "1Llc8y0CRnLX633K5eBiZ26X2X4JWiiq-",
    "WhatsApp Image 2026-09-24 at 11.57.19 PM.jpeg": "1y1XFV5Jl9U7XfIXZxTVogjH_jOAsiMXN",
    "WhatsApp Image 2026-09-24 at 11.57.20 PM.jpeg": "1iYUmrij_xKziPqBE9dV2DPKcfBs3VNMz",
    "WhatsApp Image 2026-09-24 at 11.57.21 PM.jpeg": "1o63xph4ebNah8-ASV-W2NWshnfc9h6Pe",
    "WhatsApp Image 2026-09-24 at 11.57.22 PM.jpeg": "1vCzGQEzaPayNtbA_S3z4sD76-TCU6RxZ",
    "WhatsApp Image 2026-09-24 at 11.57.23 PM.jpeg": "1OgOC-Ns3b_5LPUladUida8FdEHvhBo6Z",
    "WhatsApp Image 2026-09-24 at 11.57.25 PM.jpeg": "1TQaQLZgvgzlEoVdzbNh9fZXxtetteAAv",
    "WhatsApp Image 2026-09-24 at 11.57.26 PM.jpeg": "1yh3DsYnDJO_WOK5mm-ajmWiNrVl49jM2",
    "WhatsApp Image 2026-09-24 at 11.58.47 PM.jpeg": "1LcZ7UNxIzweBpiYavnVWpZ5-1B6Rdc9P",
    "WhatsApp Image 2026-09-24 at 11.59.18 PM.jpeg": "1sYLtYm8OCzrQ9KRwwkH80uGiosXnjwTJ",
    "WhatsApp Image 2026-09-24 at 11.59.20 PM.jpeg": "19UD7WgPC9sZOg5ucKpIPP4cclIL8aXg0",
    "WhatsApp Image 2026-09-24 at 11.59.21 PM (1).jpeg": "18l1VNhqdX05Jjrx23zS_k4CE-76vYVyx",
    "WhatsApp Image 2026-09-24 at 11.59.25 PM.jpeg": "1_lEjPBmVv6dmmIvbk4fJ0tOMSq4nf43G",
    "WhatsApp Image 2026-09-24 at 3.33.28 PM.jpeg": "1kcVGgGPVR4YYxrR2gNzTZrPCPDZvL8fk",
    "WhatsApp Image 2026-09-25 at 12.01.29 AM.jpeg": "1wY4yReuhkeVcUltSG3LHFqSPjWxbPjvx",
    "WhatsApp Image 2026-09-25 at 12.01.51 AM.jpeg": "14bYAVcRdH_i3HjZrkamrJ_274jTWhHPS",
    "WhatsApp Image 2026-09-25 at 12.01.52 AM.jpeg": "1Pm_Egsxj2n7dQA2MN502dTv_2ou5Q9id",
    "WhatsApp Image 2026-09-25 at 12.01.53 AM.jpeg": "1PJG3umy5I1BUetsR5EyQryOwIoXoQl_X",
    "WhatsApp Image 2026-09-25 at 12.02.38 AM.jpeg": "1M0DrzG3YHWcffM_KogRRTxe-Zo3yFxrt",
    "WhatsApp Image 2026-09-25 at 12.02.39 AM.jpeg": "1iTvkstaToPoAPhfCGkt80jcKoVawBAyQ",
    "WhatsApp Image 2026-09-25 at 12.02.40 AM.jpeg": "1pPWIg59_flZmiyOJiEoybQP4NLcNeKip",
    "WhatsApp Image 2026-09-25 at 12.02.41 AM.jpeg": "1w_n0Dh-JDOloQhX9wAsp8z8Ahf0ylxgK"
}

out_dir = r"c:\Users\91884\VR Paintings Solution\frontend\public\portfolio"
MAX_RETRIES = 3

downloaded = 0
skipped = 0
failed = []

for filename, file_id in files.items():
    out_path = os.path.join(out_dir, filename)
    # Skip if already downloaded and file is > 1KB (not an error page)
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1024:
        print(f"SKIP (exists): {filename}")
        skipped += 1
        continue

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"[{attempt}/{MAX_RETRIES}] Downloading {filename}...")
            url = f"https://drive.google.com/uc?export=download&id={file_id}"
            session = requests.Session()
            response = session.get(url, allow_redirects=True, timeout=30)
            if response.status_code == 200 and len(response.content) > 1024:
                with open(out_path, 'wb') as f:
                    f.write(response.content)
                print(f"  OK ({len(response.content)} bytes)")
                downloaded += 1
                break
            else:
                print(f"  Bad response: status={response.status_code}, size={len(response.content)}")
        except Exception as e:
            print(f"  Error: {e}")
        
        if attempt < MAX_RETRIES:
            wait = 3 * attempt
            print(f"  Retrying in {wait}s...")
            time.sleep(wait)
    else:
        failed.append(filename)
        print(f"  FAILED after {MAX_RETRIES} attempts: {filename}")
    
    # Small delay between files to avoid rate limiting
    time.sleep(1)

print(f"\n=== SUMMARY ===")
print(f"Downloaded: {downloaded}")
print(f"Skipped (already existed): {skipped}")
print(f"Failed: {len(failed)}")
if failed:
    print("Failed files:")
    for f in failed:
        print(f"  - {f}")

import os
import sys
import ssl

# ====================== DISABLE SSL VERIFICATION ======================
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# ====================== CONFIGURATION ======================
current_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(current_dir, "tcms.conf")

os.environ["TCMS_CONF"] = config_path

# === Correct settings based on your Builds page ===
os.environ["TCMS_PLAN_ID"] = "6"
os.environ["TCMS_PRODUCT"] = "X-Test"
os.environ["TCMS_PRODUCT_VERSION"] = "19.0.0.12"
os.environ["TCMS_BUILD"] = "19-enterprise-internal-12"   # ← This is the correct one
os.environ["TCMS_VERIFY_SSL"] = "false"

# ====================== RUN ======================
from tcms_junit_plugin import main

if __name__ == "__main__":
    print(f"Using config file: {config_path}")
    
    if not os.path.exists(config_path):
        print("ERROR: tcms.conf not found!")
        sys.exit(1)

    xml_file = "results.xml"

    print("Starting upload to Kiwi TCMS...")
    print(f"   Plan ID          : 6")
    print(f"   Product          : X-Test")
    print(f"   Product Version  : 19.0.0.12")
    print(f"   Build            : 19-enterprise-internal-12")
    print(f"   JUnit XML        : {xml_file}")

    try:
        main(["tcms-junit.xml-plugin", xml_file])
        print("\n✅ Upload completed successfully!")
    except Exception as e:
        print(f"\n❌ Upload failed: {e}")
        sys.exit(1)
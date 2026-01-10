#!/bin/bash
# IndexNow Ping Script
# Usage: ./scripts/ping-indexnow.sh /path/to/changed/page

KEY="ac48b59f6ee5f44dcfef38cd7a0531bc"
HOST="www.countcharacters.org"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# If specific URL provided, ping that
if [ -n "$1" ]; then
  URL="https://${HOST}$1"
  echo "Pinging IndexNow for: $URL"
  curl -s "https://api.indexnow.org/indexnow?url=${URL}&key=${KEY}&keyLocation=${KEY_LOCATION}"
  echo ""
  exit 0
fi

# Otherwise, ping all main pages
URLS=(
  "/"
  "/json-formatter"
  "/yaml-formatter"
  "/toml-formatter"
  "/diff-checker"
  "/json-to-csv-converter"
  "/json-to-toon-converter"
  "/uuid-generator"
  "/base64-encoder"
  "/cron-job-generator"
  "/image-compressor"
  "/palette-forge"
)

echo "Pinging IndexNow for all main pages..."
for path in "${URLS[@]}"; do
  URL="https://${HOST}${path}"
  echo "  → $URL"
  curl -s "https://api.indexnow.org/indexnow?url=${URL}&key=${KEY}&keyLocation=${KEY_LOCATION}" > /dev/null
done

echo "Done! All URLs submitted to IndexNow."

#!/bin/bash
# IndexNow Batch Ping Script (POST method)
# Usage: ./scripts/ping-indexnow.sh

KEY="ac48b59f6ee5f44dcfef38cd7a0531bc"
HOST="www.countcharacters.org"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# All main URLs to submit
URLS=$(cat <<EOF
[
  "https://${HOST}/",
  "https://${HOST}/json-formatter",
  "https://${HOST}/yaml-formatter",
  "https://${HOST}/toml-formatter",
  "https://${HOST}/diff-checker",
  "https://${HOST}/json-to-csv-converter",
  "https://${HOST}/json-to-toon-converter",
  "https://${HOST}/uuid-generator",
  "https://${HOST}/base64-encoder",
  "https://${HOST}/cron-job-generator",
  "https://${HOST}/image-compressor",
  "https://${HOST}/palette-forge",
  "https://${HOST}/converter/json-to-yaml",
  "https://${HOST}/converter/yaml-to-json",
  "https://${HOST}/converter/xml-to-json",
  "https://${HOST}/converter/json-to-xml"
]
EOF
)

# Build JSON payload
PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${URLS}
}
EOF
)

echo "Submitting URLs to IndexNow (Bing/Yandex)..."
echo "Host: ${HOST}"
echo "URLs: 16 pages"
echo ""

# POST to IndexNow API
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "✅ Success! HTTP ${HTTP_CODE}"
  echo "All URLs submitted to IndexNow."
else
  echo "⚠️ Response: HTTP ${HTTP_CODE}"
  echo "$BODY"
fi

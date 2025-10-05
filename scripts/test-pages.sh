#!/bin/bash

# Cross-Browser Testing - Page Availability Check
# Tests that all pages load successfully

BASE_URL="${TEST_URL:-http://localhost:4321}"

echo "============================================================"
echo "PAGE AVAILABILITY TEST"
echo "============================================================"
echo "Testing site at: $BASE_URL"
echo ""

PAGES=(
  "/"
  "/services"
  "/services/emergency-locksmith"
  "/services/residential-locksmith"
  "/services/commercial-locksmith"
  "/services/automotive-locksmith"
  "/service-areas"
  "/faq"
  "/reviews"
  "/about"
  "/contact"
  "/book-service"
  "/privacy-policy"
  "/terms-of-service"
  "/accessibility"
)

PASSED=0
FAILED=0

for page in "${PAGES[@]}"; do
  URL="${BASE_URL}${page}"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  
  if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ $page (HTTP $HTTP_CODE)"
    ((PASSED++))
  else
    echo "❌ $page (HTTP $HTTP_CODE)"
    ((FAILED++))
  fi
done

echo ""
echo "============================================================"
echo "SUMMARY"
echo "============================================================"
echo "Total Pages: ${#PAGES[@]}"
echo "✅ Passed: $PASSED"
echo "❌ Failed: $FAILED"
echo "============================================================"

if [ $FAILED -gt 0 ]; then
  exit 1
fi

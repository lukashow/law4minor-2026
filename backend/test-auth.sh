#!/bin/bash

# Test script to verify database and seeding work correctly

BACKEND_URL="${1:-http://localhost:3001}"

echo "=== Testing Backend at $BACKEND_URL ==="
echo ""

# 1. Health check
echo "1. Checking if backend is running..."
if curl -s "$BACKEND_URL/api/public/articles" > /dev/null 2>&1; then
  echo "   ✅ Backend is responding"
else
  echo "   ❌ Backend is not responding"
  exit 1
fi

echo ""

# 2. Try to login with default admin credentials
echo "2. Testing login with admin credentials..."
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@law4minor.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-Law4MinorPW1753##}"

LOGIN_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$ADMIN_EMAIL\", \"password\": \"$ADMIN_PASSWORD\"}")

echo "   Response: $LOGIN_RESPONSE"

if echo "$LOGIN_RESPONSE" | grep -q '"user"'; then
  echo "   ✅ Login successful!"
  USER_ID=$(echo "$LOGIN_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "   User ID: $USER_ID"
else
  echo "   ❌ Login failed"
  echo ""
  echo "3. Trying alternate credentials (admin@law4minor.org / admin123)..."
  
  LOGIN_RESPONSE2=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email": "admin@law4minor.org", "password": "admin123"}')
  
  echo "   Response: $LOGIN_RESPONSE2"
  
  if echo "$LOGIN_RESPONSE2" | grep -q '"user"'; then
    echo "   ✅ Login successful with default credentials!"
  else
    echo "   ❌ Login failed with both credential sets"
  fi
fi

echo ""
echo "=== Test Complete ==="

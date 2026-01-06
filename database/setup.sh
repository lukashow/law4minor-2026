#!/bin/bash
# PocketBase Setup Script for v0.21+
# Creates all collections for the Law4Minor CMS

BASE_URL="http://127.0.0.1:8090"
ADMIN_EMAIL="admin@law4minor.com"
ADMIN_PASSWORD="Admin123!"

# Authenticate as superuser (PocketBase v0.21+)
echo "🔐 Authenticating..."
AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/api/collections/_superusers/auth-with-password" \
  -H "Content-Type: application/json" \
  -d "{\"identity\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

TOKEN=$(echo $AUTH_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Auth response: $AUTH_RESPONSE"
  echo "❌ Failed to authenticate. Trying legacy endpoint..."
  
  # Try legacy endpoint
  AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/api/admins/auth-with-password" \
    -H "Content-Type: application/json" \
    -d "{\"identity\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")
  
  TOKEN=$(echo $AUTH_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
  
  if [ -z "$TOKEN" ]; then
    echo "❌ Failed to authenticate with both endpoints."
    exit 1
  fi
fi

echo "✅ Authenticated successfully"

# Create collections
echo "📦 Creating collections..."

# Categories collection
echo "Creating categories..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "categories",
    "type": "base",
    "schema": [
      {"name": "name", "type": "text", "required": true},
      {"name": "slug", "type": "text", "required": true},
      {"name": "description", "type": "text"}
    ]
  }'
echo " ✅ categories"

# Tags collection
echo "Creating tags..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "tags",
    "type": "base",
    "schema": [
      {"name": "name", "type": "text", "required": true},
      {"name": "slug", "type": "text", "required": true}
    ]
  }'
echo " ✅ tags"

# Posts collection
echo "Creating posts..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "posts",
    "type": "base",
    "schema": [
      {"name": "title", "type": "text", "required": true},
      {"name": "slug", "type": "text", "required": true},
      {"name": "content", "type": "json", "required": true},
      {"name": "excerpt", "type": "text"},
      {"name": "featured_image", "type": "file", "options": {"maxSelect": 1}},
      {"name": "status", "type": "select", "required": true, "options": {"values": ["draft", "published", "scheduled", "private"]}},
      {"name": "published_at", "type": "date"},
      {"name": "meta_title", "type": "text"},
      {"name": "meta_description", "type": "text"}
    ]
  }'
echo " ✅ posts"

# Pages collection
echo "Creating pages..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "pages",
    "type": "base",
    "schema": [
      {"name": "title", "type": "text", "required": true},
      {"name": "slug", "type": "text", "required": true},
      {"name": "content", "type": "json", "required": true},
      {"name": "status", "type": "select", "required": true, "options": {"values": ["draft", "published", "private"]}},
      {"name": "template", "type": "select", "options": {"values": ["default", "full-width", "sidebar", "landing"]}},
      {"name": "featured_image", "type": "file", "options": {"maxSelect": 1}},
      {"name": "order", "type": "number"},
      {"name": "meta_title", "type": "text"},
      {"name": "meta_description", "type": "text"}
    ]
  }'
echo " ✅ pages"

# Media collection
echo "Creating media..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "media",
    "type": "base",
    "schema": [
      {"name": "title", "type": "text"},
      {"name": "file", "type": "file", "required": true, "options": {"maxSelect": 1}},
      {"name": "alt_text", "type": "text"},
      {"name": "caption", "type": "text"}
    ]
  }'
echo " ✅ media"

# Comments collection
echo "Creating comments..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "comments",
    "type": "base",
    "schema": [
      {"name": "content", "type": "text", "required": true},
      {"name": "author_name", "type": "text"},
      {"name": "author_email", "type": "email"},
      {"name": "status", "type": "select", "required": true, "options": {"values": ["pending", "approved", "spam", "trash"]}}
    ]
  }'
echo " ✅ comments"

# Settings collection
echo "Creating settings..."
curl -s -X POST "$BASE_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "name": "settings",
    "type": "base",
    "schema": [
      {"name": "key", "type": "text", "required": true},
      {"name": "value", "type": "json", "required": true},
      {"name": "group", "type": "text"}
    ]
  }'
echo " ✅ settings"

echo ""
echo "🎉 All collections created successfully!"
echo "📊 Dashboard: $BASE_URL/_/"

#!/bin/sh

# Wait for database to be ready
echo "Waiting for database..."
sleep 3

# Sync database schema (push mode - simpler for dev/deployment)
echo "Syncing database schema..."
npx prisma db push

echo "Database schema synced successfully."

# Run seed to create default admin user (if not exists)
echo "Running seed..."
npx tsx prisma/seed.ts || echo "Seed completed or skipped"

# Start the application
exec node dist/server.js
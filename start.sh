#!/bin/bash
set -e
mkdir -p /app/prisma
npx prisma migrate deploy || true
node .next/standalone/server.js

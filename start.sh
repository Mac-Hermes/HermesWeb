#!/bin/bash
set -e
mkdir -p /app/prisma
npx prisma migrate deploy || true
npm run build || true
npm run start

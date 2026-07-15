#!/bin/bash
set -e
npx prisma migrate deploy || true
node .next/standalone/server.js

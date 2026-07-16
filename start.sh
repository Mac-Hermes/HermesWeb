#!/bin/bash
set -e
npx prisma migrate deploy || true
npm run start
 

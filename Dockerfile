FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends bash openssl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN mkdir -p /app/prisma
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["bash", "start.sh"]

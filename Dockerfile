FROM node:20
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends bash openssl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["bash", "start.sh"]

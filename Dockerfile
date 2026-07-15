FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends bash && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

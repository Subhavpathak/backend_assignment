FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npx","serve","-s","build","-l","3000"]

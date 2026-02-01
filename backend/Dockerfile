FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the NestJS application
RUN npm run build

EXPOSE 3000

# Use production start command
CMD ["npm", "run", "start:prod"]

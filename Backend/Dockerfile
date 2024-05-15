# Stage 1
FROM node:20 AS backend-builder

# setup the working dir
WORKDIR /app

# code
COPY . .

# packages install
RUN npm i

# tests
# RUN npm run test

# Stage 2
FROM node:20-slim

# setup the working dir
WORKDIR /app

# copy the above stage as compressed
COPY --from=backend-builder /app .

COPY .env .env

# Port
EXPOSE 8000

# App
CMD ["npm", "start"]

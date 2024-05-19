# ------------------- Stage 1: Build Stage ------------------------------
FROM node:20 AS frontend-builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json for dependency installation
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# ------------------- Stage 2: Final Stage ------------------------------
FROM node:20-slim

# Set the working directory to /app
WORKDIR /app

# Copy built assets and dependencies from frontend-builder stage
COPY --from=frontend-builder /app/build ./build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose port 3000 for the application
EXPOSE 3000

# Define the default command to serve the built application
CMD ["serve", "-s", "build", "-l", "3000"]

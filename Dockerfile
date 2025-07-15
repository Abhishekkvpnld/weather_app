# Step 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve the build using 'serve'
FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/build ./build

# Expose the port serve will run on
EXPOSE 5137

# Start the app with serve
CMD ["serve", "-s", "build", "-l", "5137"]

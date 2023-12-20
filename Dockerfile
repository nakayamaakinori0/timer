
# Stage 1: Building the application
FROM node:16-alpine as builder

ENV PORT 3000

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /app

# Copy the build from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set the command to start the node server.
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 3000

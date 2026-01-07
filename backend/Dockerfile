# Use Node.js for better Prisma compatibility
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache openssl

# Copy package.json
COPY package*.json ./

# Install dependencies with npm (more stable for Prisma)
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application with Bun (install Bun for building)
RUN npm install -g bun && bun build src/server.ts --outdir dist --target node

# Make start script executable
RUN chmod +x start.sh

# Expose the port the app runs on
EXPOSE 3001

# Command to run the start script
CMD ["./start.sh"]
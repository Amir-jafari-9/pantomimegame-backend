
# Use a multi-stage build to separate the build and runtime stages
# First stage: build the app
FROM node:14 as builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Node.js app
#RUN npm run build

# Second stage: run the app
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the built app from the builder stage
#COPY --from=builder /app/dist ./dist

# Expose the port 8000
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]

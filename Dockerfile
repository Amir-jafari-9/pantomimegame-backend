FROM node:21-alpine as builder

# Set a working directory
WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project source code
COPY . .

# Start the application
CMD ["npm", "start"]


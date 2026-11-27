
# 1. Select Node.js base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install production dependencies
RUN npm install --omit=dev

# 5. Copy application source code
COPY . .

# 6. Expose application port
EXPOSE 3000

# 7. Start application
CMD ["npm", "start"]


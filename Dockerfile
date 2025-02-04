# Step 1: Use the Node.js LTS Alpine image as the base for the builder
FROM node:lts-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
# Use --legacy-peer-deps if you encounter dependency conflicts
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Step 5: Copy the rest of the application code


# Step 6: Expose the port for development (default for Next.js is 3000)
EXPOSE 3000

# Step 11: Define the command to run the application in development mode
CMD ["npm", "start"]
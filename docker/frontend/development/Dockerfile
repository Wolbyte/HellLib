FROM node:20.11-alpine

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./frontend/package*.json /app/
COPY ./.env /app/

ENV NEXT_TELEMETRY_DISABLED 1

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY ./frontend /app

# Ensure port 3005 is accessible to our system
EXPOSE 3000

# Run development server
CMD [ "npm", "run", "dev" ]

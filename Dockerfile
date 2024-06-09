# Use an official Node.js runtime as a parent image
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . . /app/

# Install the dependencies
RUN npm install

# Build the app for production
RUN npm run build

# Expose port 5173 to the outside world
#EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]

FROM nginx
COPY static-html-directory /usr/share/nginx/html
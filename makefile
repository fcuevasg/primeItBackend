# Define the variables
PROJECT_NAME = backend
SRC_DIR = src
BUILD_DIR = dist
ENTRY_POINT = $(BUILD_DIR)/web/server.js

# Phony targets are not real files
.PHONY: all install build start clean docker-build docker-start docker-stop

# Default target
all: install build

# Install dependencies
install:
	npm install

# Compile TypeScript to JavaScript
build: clean
	npm run build

# Start the application using Docker Compose
start: docker-start

# Clean the build directory
clean:
	rm -rf $(BUILD_DIR)

# Build Docker images using Docker Compose
docker-build:
	docker-compose build

# Start the services using Docker Compose
docker-start:
	docker-compose up --build -d

# Stop the services using Docker Compose
docker-stop:
	docker-compose down

# Additional targets for convenience
test:
	npm test

lint:
	npm run lint

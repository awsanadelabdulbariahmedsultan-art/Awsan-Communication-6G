# =========================================================================
# DOCKER MULTI-STACK ENVIRONMENT FOR AWSAN-6G-NTN PROTOCOL
# Standard Specification: RFC-AWSAN-6G-NTN-0001
# Author: Eng. Awsan Adel Abdulbari Ahmed Sultan | National ID: 01010305468
# =========================================================================

FROM node:20-slim

# Install Python 3 and build utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --omit=dev

# Copy entire project codebase
COPY . .

# Run automatic self-verification tests during container build
RUN node tests/ntn_models.test.js
RUN python3 protocol/awsan_6g_unified_protocol.py

# Expose Web Dashboard & 6G NTN REST API port
EXPOSE 8080

# Start production server
CMD ["node", "server.js"]

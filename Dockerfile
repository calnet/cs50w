# Use Python 3.13.5 on Alpine Linux
FROM python:3.13.5-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    curl \
    git \
    sqlite \
    sudo \
    bash \
    nodejs \
    npm

# Create non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -D -s /bin/sh -u 1001 -G appgroup appuser

# Add local bin to PATH for pip packages
ENV PATH="/home/appuser/.local/bin:$PATH"

# Set working directory
WORKDIR /app

RUN pip install --no-cache-dir --upgrade pip

# Grant sudo privileges to appuser
RUN echo 'appuser ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Change ownership of the app directory to appuser
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser
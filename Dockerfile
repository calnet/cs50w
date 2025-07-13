# FROM alpine:latest
FROM python:3.13.5-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    # python3 \
    # py3-pip \
    nodejs \
    npm \
    git \
    bash \
    curl \
    wget \
    && ln -sf python3 /usr/bin/python \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy requirements.txt first for better caching
COPY ./requirements.txt /app/requirements.txt

# Create Python virtual environment and install dependencies
RUN python -m venv /app/py && \
    /app/py/bin/pip install --upgrade pip && \
    /app/py/bin/pip install -r /app/requirements.txt

# Copy package.json and package-lock.json for better caching
COPY ./frontend /app/frontend

# Remove node_modules that might have been copied
RUN rm -rf /app/frontend/node_modules

# Set working directory
WORKDIR /app/frontend

# Install Node.js dependencies
RUN npm ci && npm cache clean --force

# Copy remaining application files
WORKDIR /app
COPY ./.gitignore /app/.gitignore
COPY ./backend /app/backend
COPY ./.vscode /app/.vscode
COPY ./.git /app/.git
COPY ./Dockerfile /app/Dockerfile
COPY ./docker-compose.yml /app/docker-compose.yml


# Copy and setup startup script
COPY ./startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Create a non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/bash -D appuser && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set environment variables
ENV PATH="/app/py/bin:$PATH"
ENV NODE_ENV=development
ENV PYTHONUNBUFFERED=1

# Health check
HEALTHCHECK --interval=60s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8000/admin || exit 1

# Expose ports
EXPOSE 3000 5173 8000

# Default command
CMD ["/app/startup.sh"]
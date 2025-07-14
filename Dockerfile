FROM python:3.13.5-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    nodejs \
    npm \
    git \
    bash \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy and install Python dependencies only
COPY ./requirements.txt /app/requirements.txt
RUN python -m venv /app/py && \
    /app/py/bin/pip install --upgrade pip && \
    /app/py/bin/pip install -r /app/requirements.txt

# Copy package.json and install Node dependencies only
COPY ./frontend/package*.json /app/frontend/
WORKDIR /app/frontend
RUN npm ci && npm cache clean --force

# Copy and setup startup script
WORKDIR /app
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

# Default command
CMD ["/app/startup.sh"]
FROM python:3.13.5-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    nodejs \
    npm \
    git \
    bash \
    && rm -rf /var/cache/apk/*

# Copy and install Python dependencies only
COPY ./requirements.txt /app/requirements.txt
RUN python -m venv /app/.venv && \
    /app/.venv/bin/pip install --upgrade pip && \
    /app/.venv/bin/pip install -r /app/requirements.txt

# Copy package.json and install Node dependencies only
# COPY ./frontend/package*.json /app/frontend/
COPY ./frontend/ /app/frontend/
RUN rm -rf /app/frontend/node_modules
WORKDIR /app/frontend
RUN npm ci && npm cache clean --force

# WORKDIR /app

# Copy and setup startup script
COPY ./startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# # Create a non-root user
# RUN addgroup -g 1001 appuser && \
#     adduser -u 1001 -G appuser -s /bin/bash -D appuser && \
#     chown -R appuser:appuser /app

# # Switch to non-root user
# USER appuser

# Set environment variables
ENV PATH="/app/.venv/bin:$PATH"
ENV NODE_ENV=development
ENV PYTHONUNBUFFERED=1

WORKDIR /app
# Default command
CMD ["/app/startup.sh"]
# ==============================
# Optimized Flask Backend
# ==============================

FROM python:3.10-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install only required system deps
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first (CACHE THIS LAYER)
COPY requirements.txt .

# Upgrade pip + install deps
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy application code LAST (so rebuilds are fast)
COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]

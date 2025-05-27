#!/bin/bash

# AI Forecasting Service Startup Script
# This script starts the Python AI forecasting service

set -e

echo "🤖 Starting AI Forecasting Service..."
echo "=================================="

# Check if we're in the right directory
if [ ! -d "python" ]; then
    echo "❌ Error: python directory not found. Please run this script from the project root."
    exit 1
fi

# Navigate to python directory
cd python

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check Python version
python_version=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "🐍 Python version: $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📥 Installing requirements..."
pip install -r requirements.txt

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p models logs data

# Set environment variables
export FLASK_ENV=production
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Start the service
echo "🚀 Starting AI Forecasting Service..."
echo "📍 Service URL: http://localhost:5000"
echo "🔍 Health Check: http://localhost:5000/health"
echo "📊 Supported Symbols: http://localhost:5000/symbols"
echo ""
echo "Press Ctrl+C to stop the service"
echo "=================================="

# Run the startup script
python3 start_ai_service.py 
 
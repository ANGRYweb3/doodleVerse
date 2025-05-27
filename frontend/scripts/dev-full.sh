#!/bin/bash

# Full Development Environment Startup Script
# This script starts all services: Frontend, Backend, and AI Forecasting

set -e

echo "🚀 Starting Full Development Environment"
echo "========================================"
echo "This will start:"
echo "  📱 Frontend (React) - http://localhost:3000"
echo "  🔧 Backend (Node.js) - http://localhost:3001"
echo "  🤖 AI Service (Python) - http://localhost:5000"
echo ""

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $port is already in use"
        return 1
    fi
    return 0
}

# Function to start service in background
start_service() {
    local service_name=$1
    local command=$2
    local port=$3
    local log_file=$4
    
    echo "🔄 Starting $service_name..."
    
    if ! check_port $port; then
        echo "❌ Cannot start $service_name - port $port is in use"
        return 1
    fi
    
    # Start service in background and redirect output to log file
    eval "$command" > "$log_file" 2>&1 &
    local pid=$!
    
    # Wait a moment and check if process is still running
    sleep 2
    if kill -0 $pid 2>/dev/null; then
        echo "✅ $service_name started successfully (PID: $pid)"
        echo "$pid" > "${service_name,,}.pid"
        return 0
    else
        echo "❌ Failed to start $service_name"
        return 1
    fi
}

# Create logs directory
mkdir -p logs

# Start AI Forecasting Service (Python)
echo ""
echo "1️⃣ Starting AI Forecasting Service..."
if [ -d "python" ]; then
    cd python
    
    # Create virtual environment if needed
    if [ ! -d "venv" ]; then
        echo "📦 Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment and install requirements
    source venv/bin/activate
    pip install -q --upgrade pip
    pip install -q -r requirements.txt
    
    # Start AI service
    export PYTHONPATH="${PYTHONPATH}:$(pwd)"
    start_service "AI-Service" "python3 start_ai_service.py" 5000 "../logs/ai-service.log"
    
    cd ..
else
    echo "❌ Python directory not found, skipping AI service"
fi

# Start Backend (Node.js)
echo ""
echo "2️⃣ Starting Backend Service..."
if [ -d "backend" ]; then
    cd backend
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing backend dependencies..."
        npm install
    fi
    
    # Set environment variables
    export NODE_ENV=development
    export AI_SERVICE_URL=http://localhost:5000
    
    # Start backend
    start_service "Backend" "npm start" 3001 "../logs/backend.log"
    
    cd ..
else
    echo "❌ Backend directory not found, skipping backend service"
fi

# Start Frontend (React)
echo ""
echo "3️⃣ Starting Frontend Service..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Set environment variables
export REACT_APP_API_URL=http://localhost:3001
export BROWSER=none  # Prevent auto-opening browser

# Start frontend
start_service "Frontend" "npm start" 3000 "logs/frontend.log"

# Wait for all services to be ready
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check service health
echo ""
echo "🔍 Checking service health..."

# Check AI Service
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ AI Service is healthy"
else
    echo "❌ AI Service is not responding"
fi

# Check Backend
if curl -s http://localhost:3001/api/tools/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend is not responding"
fi

# Check Frontend (just check if port is responding)
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "🎉 Development environment is ready!"
echo "========================================"
echo "📱 Frontend:     http://localhost:3000"
echo "🔧 Backend:      http://localhost:3001"
echo "🤖 AI Service:   http://localhost:5000"
echo ""
echo "📊 AI Health:    http://localhost:5000/health"
echo "🔍 AI Symbols:   http://localhost:5000/symbols"
echo "🛠️  Backend API:  http://localhost:3001/api/tools/health"
echo ""
echo "📝 Logs are available in the 'logs' directory"
echo "🛑 To stop all services, run: ./scripts/stop-dev.sh"
echo ""
echo "Press Ctrl+C to stop monitoring (services will continue running)"

# Monitor services (optional)
while true; do
    sleep 30
    
    # Check if all services are still running
    services_running=0
    
    if [ -f "ai-service.pid" ] && kill -0 $(cat ai-service.pid) 2>/dev/null; then
        ((services_running++))
    fi
    
    if [ -f "backend.pid" ] && kill -0 $(cat backend.pid) 2>/dev/null; then
        ((services_running++))
    fi
    
    if [ -f "frontend.pid" ] && kill -0 $(cat frontend.pid) 2>/dev/null; then
        ((services_running++))
    fi
    
    if [ $services_running -eq 0 ]; then
        echo "❌ All services have stopped"
        break
    fi
done 
 
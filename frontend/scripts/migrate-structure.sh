#!/bin/bash

echo "🚀 Starting project structure migration..."

# Create new directory structure
echo "📁 Creating new directory structure..."

# Frontend directories
mkdir -p src/components/common/Layout
mkdir -p src/components/common/Navigation
mkdir -p src/components/common/UI
mkdir -p src/components/tools
mkdir -p src/components/dashboard
mkdir -p src/pages
mkdir -p src/services/tools
mkdir -p src/hooks

# Backend directories
mkdir -p backend/src/controllers/tools
mkdir -p backend/src/services/tools
mkdir -p backend/src/routes/tools
mkdir -p backend/src/middleware
mkdir -p backend/src/models
mkdir -p backend/src/database
mkdir -p backend/src/config

# Shared directories
mkdir -p shared/types
mkdir -p shared/constants

# Documentation
mkdir -p docs

echo "✅ Directory structure created!"

# Move existing components to new structure
echo "📦 Moving existing components..."

# Move ForecastTool to tools directory
if [ -f "src/components/ForecastTool.tsx" ]; then
    mkdir -p src/components/tools/ForecastTool
    mv src/components/ForecastTool.tsx src/components/tools/ForecastTool/index.tsx
    echo "✅ Moved ForecastTool to tools directory"
fi

# Move dashboard components
if [ -f "src/components/ToolsDashboard.tsx" ]; then
    mv src/components/ToolsDashboard.tsx src/components/dashboard/
    echo "✅ Moved ToolsDashboard to dashboard directory"
fi

# Move common components
for component in "Hero" "EarlyAccessSection" "HashConnectComponent" "WalletConnectErrorBoundary"; do
    if [ -f "src/components/${component}.tsx" ]; then
        mv "src/components/${component}.tsx" "src/components/common/"
        echo "✅ Moved ${component} to common directory"
    fi
done

echo "🎉 Migration completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update import paths in your components"
echo "2. Test the application"
echo "3. Add new tools using the tool registry pattern"
echo ""
echo "📖 See PROJECT_STRUCTURE.md for detailed information" 
 
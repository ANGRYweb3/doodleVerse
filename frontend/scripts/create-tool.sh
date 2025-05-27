#!/bin/bash

# Script to create a new tool
if [ $# -eq 0 ]; then
    echo "Usage: ./create-tool.sh <ToolName> <tool-id> <category> <description>"
    echo "Example: ./create-tool.sh PortfolioTracker portfolio-tracker trading 'Track your crypto portfolio'"
    exit 1
fi

TOOL_NAME=$1
TOOL_ID=$2
CATEGORY=$3
DESCRIPTION=$4

echo "🛠️ Creating new tool: $TOOL_NAME"

# Create tool directory
TOOL_DIR="src/components/tools/$TOOL_NAME"
mkdir -p "$TOOL_DIR"

# Create tool component
cat > "$TOOL_DIR/index.tsx" << EOF
import React, { useState } from 'react';
import { ToolPageProps } from '../../../types/tools';

const $TOOL_NAME: React.FC<ToolPageProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Tool Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-doodle mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              $TOOL_NAME
            </span>
          </h1>
          <p className="text-gray-600 font-doodle-body">
            $DESCRIPTION
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          
          {/* Input Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg doodle-border">
            <h2 className="text-xl font-bold text-gray-800 mb-4 font-doodle">
              Input Parameters
            </h2>
            
            {/* Add your input fields here */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-doodle-fun">
                  Sample Input
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter value..."
                />
              </div>
              
              <button
                onClick={() => {
                  setLoading(true);
                  // Add your processing logic here
                  setTimeout(() => setLoading(false), 2000);
                }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-doodle-fun"
              >
                {loading ? 'Processing...' : 'Process Data'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg doodle-border">
            <h2 className="text-xl font-bold text-gray-800 mb-4 font-doodle">
              Results
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <div className="text-gray-600 font-doodle-body">
                Results will appear here...
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default $TOOL_NAME;
EOF

# Create service file
SERVICE_DIR="src/services/tools"
mkdir -p "$SERVICE_DIR"

cat > "$SERVICE_DIR/${TOOL_ID}.ts" << EOF
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const ${TOOL_ID}Service = {
  async getData() {
    const response = await fetch(\`\${API_BASE}/api/tools/${TOOL_ID}/data\`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  },

  async processData(data: any) {
    const response = await fetch(\`\${API_BASE}/api/tools/${TOOL_ID}/process\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to process data');
    return response.json();
  }
};
EOF

# Create hook file
HOOKS_DIR="src/hooks"
mkdir -p "$HOOKS_DIR"

cat > "$HOOKS_DIR/use${TOOL_NAME}.ts" << EOF
import { useState, useEffect } from 'react';
import { ${TOOL_ID}Service } from '../services/tools/${TOOL_ID}';

export const use${TOOL_NAME} = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ${TOOL_ID}Service.getData();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const processData = async (inputData: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ${TOOL_ID}Service.processData(inputData);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData, processData };
};
EOF

# Create backend route
BACKEND_ROUTES_DIR="backend/src/routes/tools"
mkdir -p "$BACKEND_ROUTES_DIR"

cat > "$BACKEND_ROUTES_DIR/${TOOL_ID}.js" << EOF
const express = require('express');
const router = express.Router();

// GET endpoint for fetching data
router.get('/data', async (req, res) => {
  try {
    // Add your data fetching logic here
    const data = {
      message: 'Data from ${TOOL_NAME}',
      timestamp: new Date().toISOString()
    };
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching ${TOOL_NAME} data:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint for processing data
router.post('/process', async (req, res) => {
  try {
    const inputData = req.body;
    
    // Add your processing logic here
    const result = {
      processed: true,
      input: inputData,
      output: 'Processed data from ${TOOL_NAME}',
      timestamp: new Date().toISOString()
    };
    
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error processing ${TOOL_NAME} data:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
EOF

echo "✅ Tool files created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Add the tool to src/config/tools.ts:"
echo ""
echo "   // Add import"
echo "   const $TOOL_NAME = React.lazy(() => import('../components/tools/$TOOL_NAME'));"
echo ""
echo "   // Add to TOOLS array"
echo "   {"
echo "     id: '$TOOL_ID',"
echo "     name: '$TOOL_NAME',"
echo "     description: '$DESCRIPTION',"
echo "     icon: '🔧', // Choose appropriate emoji"
echo "     component: $TOOL_NAME,"
echo "     requiredNFT: true,"
echo "     category: '$CATEGORY',"
echo "     isActive: true,"
echo "     comingSoon: false"
echo "   }"
echo ""
echo "2. Add the route to backend/src/routes/tools/index.js:"
echo "   const ${TOOL_ID}Router = require('./${TOOL_ID}');"
echo "   router.use('/${TOOL_ID}', ${TOOL_ID}Router);"
echo ""
echo "3. Customize the component, service, and API logic"
echo "4. Test your new tool!"
EOF

chmod +x scripts/create-tool.sh 
 
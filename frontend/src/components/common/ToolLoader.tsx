import React, { Suspense } from 'react';
import { getToolById } from '../../config/tools';
import { ToolPageProps } from '../../types/tools';

interface ToolLoaderProps {
  toolId: string;
  onBack: () => void;
  accountId?: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-doodle-fun">กำลังโหลด tool...</p>
    </div>
  </div>
);

const NotFound: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 font-doodle">Tool ไม่พบ</h2>
      <p className="text-gray-600 mb-6 font-doodle-fun">ขออภัย เราไม่พบ tool ที่คุณต้องการ</p>
      <button
        onClick={onBack}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-doodle-fun"
      >
        กลับไปหน้าหลัก
      </button>
    </div>
  </div>
);

const ComingSoon: React.FC<{ toolName: string; onBack: () => void }> = ({ toolName, onBack }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">🚀</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 font-doodle">{toolName}</h2>
      <p className="text-gray-600 mb-6 font-doodle-fun">Tool นี้กำลังพัฒนา เร็วๆ นี้!</p>
      <button
        onClick={onBack}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-doodle-fun"
      >
        กลับไปหน้า Dashboard
      </button>
    </div>
  </div>
);

const ToolLoader: React.FC<ToolLoaderProps> = ({ toolId, onBack, accountId }) => {
  const tool = getToolById(toolId);

  if (!tool) {
    return <NotFound onBack={onBack} />;
  }

  if (tool.comingSoon || !tool.isActive) {
    return <ComingSoon toolName={tool.name} onBack={onBack} />;
  }

  const ToolComponent = tool.component;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen">
        {/* Tool Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 font-doodle">{tool.name}</h1>
                  <p className="text-sm text-gray-600 font-doodle-fun">{tool.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Content */}
        <ToolComponent onBack={onBack} accountId={accountId} />
      </div>
    </Suspense>
  );
};

export default ToolLoader; 
 
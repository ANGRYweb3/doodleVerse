export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  component: React.ComponentType<any>;
  requiredNFT: boolean;
  category: 'hedera' | 'coming-soon' | 'ideas';
  isActive: boolean;
  comingSoon?: boolean;
  likes?: number;
  userLiked?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export type AppView = 'home' | 'dashboard' | 'tool' | 'privacy' | 'terms';

export interface ToolPageProps {
  toolId: string;
  onBack: () => void;
} 
 
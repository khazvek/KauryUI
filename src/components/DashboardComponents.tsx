import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Eye,
  Clock,
  Zap,
  Target,
  PieChart,
  LineChart,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  MousePointer,
  ShoppingCart,
  Heart,
  MessageCircle,
  Share2,
  Download,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import { CodeModal } from './CodeModal';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

interface ComponentCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'overview' | 'analytics' | 'realtime';
  gradient: string;
  value?: string;
  change?: string;
  trend?: 'up' | 'down';
}

export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentCard | null>(null);
  const [selectedComponentForPreview, setSelectedComponentForPreview] = useState<ComponentCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'overview' | 'analytics' | 'realtime'>('all');

  const components: ComponentCard[] = [
    // Overview Components
    {
      id: 'total-users',
      title: 'Total Users',
      description: 'Display total user count with trend indicator',
      icon: Users,
      category: 'overview',
      gradient: 'from-blue-500 to-cyan-500',
      value: '12,345',
      change: '+12%',
      trend: 'up'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      description: 'Show revenue metrics with growth percentage',
      icon: DollarSign,
      category: 'overview',
      gradient: 'from-green-500 to-emerald-500',
      value: '$45,678',
      change: '+8.2%',
      trend: 'up'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      description: 'Track conversion metrics and performance',
      icon: Target,
      category: 'overview',
      gradient: 'from-purple-500 to-pink-500',
      value: '3.24%',
      change: '-0.5%',
      trend: 'down'
    },
    {
      id: 'page-views',
      title: 'Page Views',
      description: 'Monitor total page views and engagement',
      icon: Eye,
      category: 'overview',
      gradient: 'from-orange-500 to-red-500',
      value: '89,123',
      change: '+15.3%',
      trend: 'up'
    },

    // Analytics Components
    {
      id: 'traffic-chart',
      title: 'Traffic Analytics',
      description: 'Interactive line chart for traffic analysis',
      icon: LineChart,
      category: 'analytics',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'user-demographics',
      title: 'User Demographics',
      description: 'Pie chart showing user demographic breakdown',
      icon: PieChart,
      category: 'analytics',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'device-analytics',
      title: 'Device Analytics',
      description: 'Track user devices and platform usage',
      icon: Monitor,
      category: 'analytics',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'geographic-data',
      title: 'Geographic Data',
      description: 'World map showing user geographic distribution',
      icon: Globe,
      category: 'analytics',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'performance-metrics',
      title: 'Performance Metrics',
      description: 'Track website performance and loading times',
      icon: Zap,
      category: 'analytics',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      id: 'funnel-analysis',
      title: 'Funnel Analysis',
      description: 'Conversion funnel visualization and analysis',
      icon: BarChart3,
      category: 'analytics',
      gradient: 'from-emerald-500 to-teal-500'
    },

    // Real-time Components
    {
      id: 'live-visitors',
      title: 'Live Visitors',
      description: 'Real-time visitor count with live updates',
      icon: Activity,
      category: 'realtime',
      gradient: 'from-red-500 to-pink-500',
      value: '247',
      change: 'Live'
    },
    {
      id: 'recent-activity',
      title: 'Recent Activity',
      description: 'Live feed of recent user activities',
      icon: Clock,
      category: 'realtime',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'live-sales',
      title: 'Live Sales',
      description: 'Real-time sales tracking and notifications',
      icon: ShoppingCart,
      category: 'realtime',
      gradient: 'from-green-500 to-teal-500',
      value: '$1,234',
      change: '+$89 (5m ago)'
    },
    {
      id: 'social-mentions',
      title: 'Social Mentions',
      description: 'Real-time social media mentions and engagement',
      icon: MessageCircle,
      category: 'realtime',
      gradient: 'from-purple-500 to-violet-500',
      value: '156',
      change: '+12 (1h)'
    },
    {
      id: 'system-status',
      title: 'System Status',
      description: 'Live system health and performance monitoring',
      icon: Heart,
      category: 'realtime',
      gradient: 'from-emerald-500 to-green-500',
      value: '99.9%',
      change: 'Healthy'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Components', count: components.length },
    { id: 'overview', label: 'Overview', count: components.filter(c => c.category === 'overview').length },
    { id: 'analytics', label: 'Analytics', count: components.filter(c => c.category === 'analytics').length },
    { id: 'realtime', label: 'Real-time', count: components.filter(c => c.category === 'realtime').length }
  ];

  const filteredComponents = activeCategory === 'all' 
    ? components 
    : components.filter(c => c.category === activeCategory);

  const generateCdnCode = (component: ComponentCard) => {
    // Generate visual preview based on component type
    const generateComponentHTML = () => {
      const IconComponent = component.icon;
      const iconSymbol = getIconSymbol(component.icon.name);
      
      if (component.category === 'overview') {
        return `
          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon ${component.gradient.replace('from-', 'bg-').replace(' to-', '-to-').replace('-500', '-500')}">${iconSymbol}</div>
              <div class="metric-category">Overview</div>
            </div>
            <div class="metric-content">
              <h3 class="metric-title">${component.title}</h3>
              <div class="metric-value">${component.value || '0'}</div>
              <div class="metric-change ${component.trend === 'up' ? 'positive' : component.trend === 'down' ? 'negative' : 'neutral'}">
                <span class="trend-icon">${component.trend === 'up' ? '↗' : component.trend === 'down' ? '↘' : '●'}</span>
                ${component.change || '+0%'}
              </div>
            </div>
          </div>
        `;
      } else if (component.category === 'analytics') {
        return `
          <div class="analytics-card">
            <div class="analytics-header">
              <div class="analytics-icon ${component.gradient.replace('from-', 'bg-').replace(' to-', '-to-').replace('-500', '-500')}">${iconSymbol}</div>
              <h3 class="analytics-title">${component.title}</h3>
            </div>
            <div class="analytics-content">
              <div class="chart-placeholder">
                ${generateChartPreview(component.id)}
              </div>
              <p class="analytics-description">${component.description}</p>
            </div>
          </div>
        `;
      } else if (component.category === 'realtime') {
        return `
          <div class="realtime-card">
            <div class="realtime-header">
              <div class="realtime-icon ${component.gradient.replace('from-', 'bg-').replace(' to-', '-to-').replace('-500', '-500')}">${iconSymbol}</div>
              <div class="live-indicator">
                <div class="pulse-dot"></div>
                <span>LIVE</span>
              </div>
            </div>
            <div class="realtime-content">
              <h3 class="realtime-title">${component.title}</h3>
              <div class="realtime-value">${component.value || '0'}</div>
              <div class="realtime-change">${component.change || 'Real-time data'}</div>
            </div>
          </div>
        `;
      }
      return '<div>Component preview</div>';
    };

    const getIconSymbol = (iconName: string) => {
      const iconMap: { [key: string]: string } = {
        'Users': '👥',
        'DollarSign': '$',
        'Target': '🎯',
        'Eye': '👁',
        'LineChart': '📈',
        'PieChart': '📊',
        'Monitor': '💻',
        'Globe': '🌍',
        'Zap': '⚡',
        'BarChart3': '📊',
        'Activity': '📡',
        'Clock': '🕐',
        'ShoppingCart': '🛒',
        'MessageCircle': '💬',
        'Heart': '❤️'
      };
      return iconMap[iconName] || '📊';
    };

    const generateChartPreview = (componentId: string) => {
      if (componentId.includes('traffic') || componentId.includes('line')) {
        return `
          <svg viewBox="0 0 300 150" class="chart-svg">
            <polyline points="20,130 60,100 100,80 140,60 180,40 220,30 260,20" 
                      fill="none" stroke="url(#gradient)" stroke-width="3"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#3b82f6"/>
                <stop offset="100%" style="stop-color:#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
        `;
      } else if (componentId.includes('pie') || componentId.includes('demographics')) {
        return `
          <svg viewBox="0 0 150 150" class="chart-svg">
            <circle cx="75" cy="75" r="60" fill="none" stroke="#3b82f6" stroke-width="20" 
                    stroke-dasharray="113 377" transform="rotate(-90 75 75)"/>
            <circle cx="75" cy="75" r="60" fill="none" stroke="#8b5cf6" stroke-width="20" 
                    stroke-dasharray="75 377" stroke-dashoffset="-113" transform="rotate(-90 75 75)"/>
            <circle cx="75" cy="75" r="60" fill="none" stroke="#06b6d4" stroke-width="20" 
                    stroke-dasharray="50 377" stroke-dashoffset="-188" transform="rotate(-90 75 75)"/>
          </svg>
        `;
      } else {
        return `
          <svg viewBox="0 0 300 150" class="chart-svg">
            <rect x="20" y="100" width="30" height="30" fill="#3b82f6"/>
            <rect x="70" y="80" width="30" height="50" fill="#8b5cf6"/>
            <rect x="120" y="60" width="30" height="70" fill="#06b6d4"/>
            <rect x="170" y="90" width="30" height="40" fill="#10b981"/>
            <rect x="220" y="50" width="30" height="80" fill="#f59e0b"/>
          </svg>
        `;
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.title} - Dashboard Component Preview</title>
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Overview Components */
        .metric-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(71, 85, 105, 0.3);
            border-radius: 16px;
            padding: 24px;
            width: 100%;
            max-width: 320px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .metric-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .metric-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }
        
        .metric-category {
            font-size: 12px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .metric-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: #f1f5f9;
        }
        
        .metric-value {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            color: white;
        }
        
        .metric-change {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
        }
        
        .metric-change.positive { color: #10b981; }
        .metric-change.negative { color: #ef4444; }
        .metric-change.neutral { color: #3b82f6; }
        
        .trend-icon {
            margin-right: 4px;
            font-size: 16px;
        }
        
        /* Analytics Components */
        .analytics-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(71, 85, 105, 0.3);
            border-radius: 16px;
            padding: 24px;
            width: 100%;
            max-width: 400px;
            backdrop-filter: blur(10px);
        }
        
        .analytics-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .analytics-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin-right: 12px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }
        
        .analytics-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            color: #f1f5f9;
        }
        
        .chart-placeholder {
            background: rgba(15, 23, 42, 0.5);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 150px;
        }
        
        .chart-svg {
            width: 100%;
            height: 100%;
            max-width: 300px;
            max-height: 150px;
        }
        
        .analytics-description {
            font-size: 14px;
            color: #94a3b8;
            margin: 0;
            line-height: 1.5;
        }
        
        /* Real-time Components */
        .realtime-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(71, 85, 105, 0.3);
            border-radius: 16px;
            padding: 24px;
            width: 100%;
            max-width: 320px;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }
        
        .realtime-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .realtime-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .realtime-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            background: linear-gradient(135deg, #ef4444, #f97316);
        }
        
        .live-indicator {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #ef4444;
            font-weight: 600;
        }
        
        .pulse-dot {
            width: 8px;
            height: 8px;
            background: #ef4444;
            border-radius: 50%;
            margin-right: 6px;
            animation: pulse 1s ease-in-out infinite;
        }
        
        .realtime-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: #f1f5f9;
        }
        
        .realtime-value {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            color: white;
        }
        
        .realtime-change {
            font-size: 14px;
            color: #94a3b8;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    </style>
</head>
<body>
    ${generateComponentHTML()}
</body>
</html>`;
  };

  const handleComponentClick = (component: ComponentCard) => {
    setSelectedComponentForPreview(component);
  };

  const handleShowCode = () => {
    if (selectedComponentForPreview) {
      setSelectedComponent(selectedComponentForPreview);
      setShowCodeModal(true);
    }
  };

  const closeModal = () => {
    setShowCodeModal(false);
    setSelectedComponent(null);
  };

  return (
    <div className="h-full bg-gray-950">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Dashboard Components</h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-3xl">
            Professional dashboard components for analytics, metrics, and real-time data visualization. 
            Click any component to get the CDN code.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Components List */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Available Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComponents.map((component, index) => {
                const IconComponent = component.icon;
                const isSelected = selectedComponentForPreview?.id === component.id;
                
                return (
                  <div
                    key={component.id}
                    onClick={() => handleComponentClick(component)}
                    className={`group relative rounded-xl p-4 border transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in-up ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/25' 
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${component.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Category */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${component.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full capitalize">
                          {component.category}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-sm font-semibold mb-2 transition-colors ${
                        isSelected ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
                      }`}>
                        {component.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                        {component.description}
                      </p>

                      {/* Metrics (if available) */}
                      {component.value && (
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-white">
                            {component.value}
                          </div>
                          {component.change && (
                            <div className={`flex items-center space-x-1 text-xs ${
                              component.trend === 'up' ? 'text-green-400' : 
                              component.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                            }`}>
                              {component.trend === 'up' && <ArrowUp className="w-3 h-3" />}
                              {component.trend === 'down' && <ArrowDown className="w-3 h-3" />}
                              {!component.trend && <Activity className="w-3 h-3" />}
                              <span>{component.change}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Live Preview</h2>
              {selectedComponentForPreview && (
                <button
                  onClick={handleShowCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Code</span>
                </button>
              )}
            </div>
            
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              {selectedComponentForPreview ? (
                <div className="relative">
                  {/* Preview Header */}
                  <div className="bg-gray-700/50 px-4 py-3 border-b border-gray-600 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <selectedComponentForPreview.icon className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">{selectedComponentForPreview.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Preview Content */}
                  <div className="p-6 min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800">
                    <iframe
                      srcDoc={generateCdnCode(selectedComponentForPreview)}
                      className="w-full h-96 border-0 rounded-lg"
                      title={`Preview of ${selectedComponentForPreview.title}`}
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <MousePointer className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Select a Component</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Click on any dashboard component from the list to see its live preview here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Original grid for reference - now hidden */}
        <div className="hidden">
          {filteredComponents.map((component, index) => {
            const IconComponent = component.icon;
            
            return (
              <div
                key={component.id}
                onClick={() => handleComponentClick(component)}
                className="group relative bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${component.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${component.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full capitalize">
                      {component.category}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {component.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {component.description}
                  </p>

                  {/* Metrics (if available) */}
                  {component.value && (
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        {component.value}
                      </div>
                      {component.change && (
                        <div className={`flex items-center space-x-1 text-sm ${
                          component.trend === 'up' ? 'text-green-400' : 
                          component.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                        }`}>
                          {component.trend === 'up' && <ArrowUp className="w-3 h-3" />}
                          {component.trend === 'down' && <ArrowDown className="w-3 h-3" />}
                          {!component.trend && <Activity className="w-3 h-3" />}
                          <span>{component.change}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Click indicator */}
                  <div className="mt-4 flex items-center text-gray-500 text-xs group-hover:text-blue-400 transition-colors">
                    <MousePointer className="w-3 h-3 mr-1" />
                    <span>Click to get CDN code</span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">How to Use</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <h3 className="font-medium text-white mb-2">1. Click Component</h3>
              <p>Click on any dashboard component above to open the code modal with ready-to-use CDN code.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">2. Copy & Paste</h3>
              <p>Copy the generated HTML code and paste it into your project. No build process required!</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">3. Customize</h3>
              <p>Modify the component attributes and styling to match your design requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Modal */}
      {selectedComponent && (
        <CodeModal
          isOpen={showCodeModal}
          onClose={closeModal}
          title={`${selectedComponent.title} - CDN Code`}
          code={generateCdnCode(selectedComponent)}
          componentName={selectedComponent.title}
        />
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Code, 
  Copy,
  Check,
  Download,
  Eye,
  Settings,
  Palette,
  Layout,
  Zap,
  MessageCircle,
  Star,
  Calendar,
  BarChart3,
  Users,
  Play,
  Heart,
  Share2,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Sparkles
} from 'lucide-react';

interface EmbedGeneratorProps {
  onNavigate: (view: string) => void;
}

type EmbedType = 'button' | 'card' | 'testimonial' | 'stats' | 'social' | 'newsletter';
type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface EmbedConfig {
  type: EmbedType;
  // Button config
  buttonText: string;
  buttonUrl: string;
  buttonStyle: ButtonStyle;
  buttonSize: ButtonSize;
  // Card config
  cardTitle: string;
  cardDescription: string;
  cardImage: string;
  cardUrl: string;
  // Testimonial config
  testimonialText: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialAvatar: string;
  // Stats config
  statsValue: string;
  statsLabel: string;
  statsIcon: string;
  // Social config
  socialPlatform: string;
  socialHandle: string;
  socialFollowers: string;
  // Newsletter config
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  // Common styling
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  borderRadius: number;
  padding: number;
  shadow: boolean;
  // Enhanced animation and effects
  glassmorphismEnabled: boolean;
  entryAnimation: 'none' | 'fade-in' | 'slide-up' | 'bounce-in' | 'zoom-in';
  hoverEffect: 'none' | 'scale' | 'lift' | 'glow' | 'rotate';
}

export const EmbedGenerator: React.FC<EmbedGeneratorProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'code' | 'preview'>('design');
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [config, setConfig] = useState<EmbedConfig>({
    type: 'button',
    buttonText: 'Get Started',
    buttonUrl: 'https://example.com',
    buttonStyle: 'primary',
    buttonSize: 'md',
    cardTitle: 'Amazing Product',
    cardDescription: 'This is an amazing product that will change your life.',
    cardImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    cardUrl: 'https://example.com',
    testimonialText: 'This product has completely transformed how we work. Highly recommended!',
    testimonialAuthor: 'John Doe',
    testimonialRole: 'CEO at TechCorp',
    testimonialAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    statsValue: '10,000+',
    statsLabel: 'Happy Customers',
    statsIcon: 'users',
    socialPlatform: 'twitter',
    socialHandle: '@yourhandle',
    socialFollowers: '1.2K',
    newsletterTitle: 'Stay Updated',
    newsletterDescription: 'Get the latest news and updates delivered to your inbox.',
    newsletterPlaceholder: 'Enter your email',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    shadow: true,
    glassmorphismEnabled: false,
    entryAnimation: 'fade-in',
    hoverEffect: 'lift'
  });

  const embedTypes = [
    { id: 'button', label: 'Button', icon: Play, description: 'Call-to-action buttons' },
    { id: 'card', label: 'Card', icon: Layout, description: 'Product or content cards' },
    { id: 'testimonial', label: 'Testimonial', icon: MessageCircle, description: 'Customer reviews' },
    { id: 'stats', label: 'Stats', icon: BarChart3, description: 'Statistics display' },
    { id: 'social', label: 'Social', icon: Share2, description: 'Social media widgets' },
    { id: 'newsletter', label: 'Newsletter', icon: Users, description: 'Email signup forms' }
  ];

  const generateEmbedHTML = () => {
    // Glassmorphism styles
    let glassmorphismCss = '';
    if (config.glassmorphismEnabled) {
      glassmorphismCss = `
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
    }

    const baseStyles = `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${config.glassmorphismEnabled ? 'rgba(255, 255, 255, 0.1)' : config.backgroundColor};
      color: ${config.textColor};
      border-radius: ${config.borderRadius}px;
      padding: ${config.padding}px;
      ${config.shadow ? 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);' : ''}
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
      border: none;
      cursor: pointer;
      ${glassmorphismCss}
    `;

    // Build CSS classes for animations and effects
    let embedClasses = 'embed-widget';
    if (config.entryAnimation !== 'none') {
      embedClasses += ` embed-${config.entryAnimation}`;
    }
    if (config.hoverEffect !== 'none') {
      embedClasses += ` embed-hover-${config.hoverEffect}`;
    }

    switch (config.type) {
      case 'button':
        const buttonSizes = {
          sm: 'padding: 8px 16px; font-size: 14px;',
          md: 'padding: 12px 24px; font-size: 16px;',
          lg: 'padding: 16px 32px; font-size: 18px;'
        };
        
        const buttonStyles = {
          primary: `background: ${config.accentColor}; color: white;`,
          secondary: `background: #6b7280; color: white;`,
          outline: `background: transparent; color: ${config.accentColor}; border: 2px solid ${config.accentColor};`,
          ghost: `background: transparent; color: ${config.accentColor};`
        };

        return `<a href="${config.buttonUrl}" class="${embedClasses}" style="${baseStyles} ${buttonSizes[config.buttonSize]} ${buttonStyles[config.buttonStyle]}" target="_blank" rel="noopener">${config.buttonText}</a>`;

      case 'card':
        return `
<div class="${embedClasses}" style="${baseStyles} max-width: 300px;">
  <img src="${config.cardImage}" alt="${config.cardTitle}" style="width: 100%; height: 200px; object-fit: cover; border-radius: ${config.borderRadius}px; margin-bottom: 16px;">
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${config.cardTitle}</h3>
  <p style="margin: 0 0 16px 0; color: #6b7280; line-height: 1.5;">${config.cardDescription}</p>
  <a href="${config.cardUrl}" style="color: ${config.accentColor}; text-decoration: none; font-weight: 500;" target="_blank" rel="noopener">Learn More →</a>
</div>`;

      case 'testimonial':
        return `
<div class="${embedClasses}" style="${baseStyles} max-width: 400px;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <img src="${config.testimonialAvatar}" alt="${config.testimonialAuthor}" style="width: 48px; height: 48px; border-radius: 50%; margin-right: 12px;">
    <div>
      <div style="font-weight: 600; margin-bottom: 2px;">${config.testimonialAuthor}</div>
      <div style="color: #6b7280; font-size: 14px;">${config.testimonialRole}</div>
    </div>
  </div>
  <p style="margin: 0; font-style: italic; line-height: 1.6;">"${config.testimonialText}"</p>
</div>`;

      case 'stats':
        const getStatsIcon = () => {
          switch (config.statsIcon) {
            case 'users': return '👥';
            case 'star': return '⭐';
            case 'heart': return '❤️';
            case 'chart': return '📊';
            default: return '📈';
          }
        };

        return `
<div class="${embedClasses}" style="${baseStyles} text-align: center; min-width: 200px;">
  <div style="font-size: 32px; margin-bottom: 8px;">${getStatsIcon()}</div>
  <div style="font-size: 32px; font-weight: 700; color: ${config.accentColor}; margin-bottom: 4px;">${config.statsValue}</div>
  <div style="color: #6b7280; font-size: 14px;">${config.statsLabel}</div>
</div>`;

      case 'social':
        const getPlatformIcon = () => {
          switch (config.socialPlatform) {
            case 'twitter': return '🐦';
            case 'instagram': return '📷';
            case 'linkedin': return '💼';
            case 'youtube': return '📺';
            default: return '🌐';
          }
        };

        return `
<div class="${embedClasses}" style="${baseStyles} display: flex; align-items: center; max-width: 250px;">
  <div style="font-size: 24px; margin-right: 12px;">${getPlatformIcon()}</div>
  <div>
    <div style="font-weight: 600; margin-bottom: 2px;">${config.socialHandle}</div>
    <div style="color: #6b7280; font-size: 14px;">${config.socialFollowers} followers</div>
  </div>
</div>`;

      case 'newsletter':
        return `
<div class="${embedClasses}" style="${baseStyles} max-width: 400px;">
  <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">${config.newsletterTitle}</h3>
  <p style="margin: 0 0 16px 0; color: #6b7280; line-height: 1.5;">${config.newsletterDescription}</p>
  <div style="display: flex; gap: 8px;">
    <input type="email" placeholder="${config.newsletterPlaceholder}" style="flex: 1; padding: 12px; border: 1px solid #d1d5db; border-radius: ${config.borderRadius}px; font-size: 14px;">
    <button style="background: ${config.accentColor}; color: white; border: none; padding: 12px 20px; border-radius: ${config.borderRadius}px; font-size: 14px; cursor: pointer;">Subscribe</button>
  </div>
</div>`;

      default:
        return '<div>Select an embed type</div>';
    }
  };

  const generateFullHTML = () => {
    const embedHTML = generateEmbedHTML();
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Embed Widget</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        /* Animation Keyframes */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }

        @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }

        /* Entry Animation Classes */
        .embed-fade-in { 
            animation: fadeIn 0.6s ease-out forwards; 
            opacity: 0; 
        }

        .embed-slide-up { 
            animation: slideUp 0.6s ease-out forwards; 
            opacity: 0; 
        }

        .embed-bounce-in { 
            animation: bounceIn 0.8s ease-out forwards; 
            opacity: 0; 
        }

        .embed-zoom-in { 
            animation: zoomIn 0.5s ease-out forwards; 
            opacity: 0; 
        }

        /* Hover Effect Classes */
        .embed-hover-scale:hover { 
            transform: scale(1.05); 
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); 
        }

        .embed-hover-lift:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); 
        }

        .embed-hover-glow:hover { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 8px 15px rgba(0, 0, 0, 0.2); 
        }

        .embed-hover-rotate:hover { 
            transform: rotate(2deg) scale(1.02); 
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); 
        }

        /* Base Widget Styles */
        .embed-widget {
            position: relative;
            overflow: hidden;
        }

        .embed-widget::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .embed-widget:hover::before {
            left: 100%;
        }
    </style>
</head>
<body>
    ${embedHTML}
</body>
</html>`;
  };

  const copyToClipboard = () => {
    const embedCode = generateEmbedHTML();
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const downloadHTML = () => {
    const fullHTML = generateFullHTML();
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `embed-${config.type}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updateConfig = (updates: Partial<EmbedConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const renderConfigPanel = () => {
    switch (config.type) {
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
              <input
                type="text"
                value={config.buttonText}
                onChange={(e) => updateConfig({ buttonText: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
              <input
                type="url"
                value={config.buttonUrl}
                onChange={(e) => updateConfig({ buttonUrl: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Style</label>
              <select
                value={config.buttonStyle}
                onChange={(e) => updateConfig({ buttonStyle: e.target.value as ButtonStyle })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
              <select
                value={config.buttonSize}
                onChange={(e) => updateConfig({ buttonSize: e.target.value as ButtonSize })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={config.cardTitle}
                onChange={(e) => updateConfig({ cardTitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={config.cardDescription}
                onChange={(e) => updateConfig({ cardDescription: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={config.cardImage}
                onChange={(e) => updateConfig({ cardImage: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Link URL</label>
              <input
                type="url"
                value={config.cardUrl}
                onChange={(e) => updateConfig({ cardUrl: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Text</label>
              <textarea
                value={config.testimonialText}
                onChange={(e) => updateConfig({ testimonialText: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author Name</label>
              <input
                type="text"
                value={config.testimonialAuthor}
                onChange={(e) => updateConfig({ testimonialAuthor: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author Role</label>
              <input
                type="text"
                value={config.testimonialRole}
                onChange={(e) => updateConfig({ testimonialRole: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
              <input
                type="url"
                value={config.testimonialAvatar}
                onChange={(e) => updateConfig({ testimonialAvatar: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
              <input
                type="text"
                value={config.statsValue}
                onChange={(e) => updateConfig({ statsValue: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
              <input
                type="text"
                value={config.statsLabel}
                onChange={(e) => updateConfig({ statsLabel: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
              <select
                value={config.statsIcon}
                onChange={(e) => updateConfig({ statsIcon: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="users">Users</option>
                <option value="star">Star</option>
                <option value="heart">Heart</option>
                <option value="chart">Chart</option>
              </select>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={config.socialPlatform}
                onChange={(e) => updateConfig({ socialPlatform: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Handle</label>
              <input
                type="text"
                value={config.socialHandle}
                onChange={(e) => updateConfig({ socialHandle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Followers</label>
              <input
                type="text"
                value={config.socialFollowers}
                onChange={(e) => updateConfig({ socialFollowers: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={config.newsletterTitle}
                onChange={(e) => updateConfig({ newsletterTitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={config.newsletterDescription}
                onChange={(e) => updateConfig({ newsletterDescription: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Placeholder</label>
              <input
                type="text"
                value={config.newsletterPlaceholder}
                onChange={(e) => updateConfig({ newsletterPlaceholder: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="h-full bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Embed Generator</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Create embeddable widgets and components</p>
        </div>

        {/* Embed Type Selection */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white mb-3">Widget Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {embedTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => updateConfig({ type: type.id as EmbedType })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  config.type === type.id
                    ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                <type.icon className="w-4 h-4 mb-1" />
                <div className="text-xs font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Widget-specific config */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Content</h3>
              {renderConfigPanel()}
            </div>

            {/* Styling */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-white mb-3">Styling</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="w-12 h-8 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.textColor}
                      onChange={(e) => updateConfig({ textColor: e.target.value })}
                      className="w-12 h-8 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.textColor}
                      onChange={(e) => updateConfig({ textColor: e.target.value })}
                      className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => updateConfig({ accentColor: e.target.value })}
                      className="w-12 h-8 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => updateConfig({ accentColor: e.target.value })}
                      className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius: {config.borderRadius}px</label>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={config.borderRadius}
                    onChange={(e) => updateConfig({ borderRadius: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Padding: {config.padding}px</label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={config.padding}
                    onChange={(e) => updateConfig({ padding: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.shadow}
                      onChange={(e) => updateConfig({ shadow: e.target.checked })}
                      className="mr-2 rounded bg-gray-700 border-gray-600 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-300">Shadow</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.glassmorphismEnabled}
                      onChange={(e) => updateConfig({ glassmorphismEnabled: e.target.checked })}
                      className="mr-2 rounded bg-gray-700 border-gray-600 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-300 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Glassmorphism
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Animation & Effects */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Animation & Effects
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Entry Animation</label>
                  <select
                    value={config.entryAnimation}
                    onChange={(e) => updateConfig({ entryAnimation: e.target.value as 'none' | 'fade-in' | 'slide-up' | 'bounce-in' | 'zoom-in' })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="none">None</option>
                    <option value="fade-in">Fade In</option>
                    <option value="slide-up">Slide Up</option>
                    <option value="bounce-in">Bounce In</option>
                    <option value="zoom-in">Zoom In</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hover Effect</label>
                  <select
                    value={config.hoverEffect}
                    onChange={(e) => updateConfig({ hoverEffect: e.target.value as 'none' | 'scale' | 'lift' | 'glow' | 'rotate' })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="none">None</option>
                    <option value="scale">Scale</option>
                    <option value="lift">Lift</option>
                    <option value="glow">Glow</option>
                    <option value="rotate">Rotate</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Embed Code'}</span>
          </button>
          
          <button
            onClick={downloadHTML}
            className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download HTML</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-800">
          {[
            { id: 'design', label: 'Design', icon: Palette },
            { id: 'code', label: 'Code', icon: Code },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-teal-400 border-b-2 border-teal-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8 bg-gray-900">
          {activeTab === 'design' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Design Preview</h2>
              
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg">
                  <div dangerouslySetInnerHTML={{ __html: generateEmbedHTML() }} />
                </div>
              </div>

              {/* Widget Info */}
              <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Widget Information</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <h4 className="font-medium text-white mb-2">Features:</h4>
                    <ul className="space-y-1">
                      <li>• Responsive design</li>
                      <li>• Customizable colors</li>
                      <li>• Entry animations</li>
                      <li>• Hover effects</li>
                      <li>• Glassmorphism support</li>
                      <li>• Cross-browser compatible</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Usage:</h4>
                    <ul className="space-y-1">
                      <li>• Copy the embed code</li>
                      <li>• Paste into your HTML</li>
                      <li>• No external dependencies</li>
                      <li>• Works on any website</li>
                      <li>• Mobile-friendly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Embed Code</h2>
              
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">HTML Code</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>{generateEmbedHTML()}</code>
                  </pre>
                </div>
              </div>

              {/* Integration Instructions */}
              <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Integration Instructions</h3>
                <div className="space-y-4 text-sm text-gray-300">
                  <div>
                    <h4 className="font-medium text-white mb-2">1. Copy the Code</h4>
                    <p>Click the "Copy" button above to copy the embed code to your clipboard.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">2. Paste into Your Website</h4>
                    <p>Paste the code wherever you want the widget to appear in your HTML.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">3. Customize (Optional)</h4>
                    <p>You can modify the styles directly in the code or use the design panel to regenerate.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                
                {/* Device Toggle */}
                <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
                  {[
                    { id: 'desktop', icon: Monitor },
                    { id: 'tablet', icon: Tablet },
                    { id: 'mobile', icon: Smartphone }
                  ].map(device => (
                    <button
                      key={device.id}
                      onClick={() => setPreviewDevice(device.id as any)}
                      className={`p-2 rounded-md transition-colors ${
                        previewDevice === device.id
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <device.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="mx-auto transition-all duration-300" style={{ width: getDeviceWidth() }}>
                  <iframe
                    ref={iframeRef}
                    srcDoc={generateFullHTML()}
                    className="w-full h-96 border border-gray-600 rounded-lg bg-white"
                    title="Widget Preview"
                  />
                </div>
              </div>

              {/* Preview Info */}
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <Globe className="w-8 h-8 text-teal-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">Universal</h3>
                  <p className="text-sm text-gray-400">Works on any website or platform</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <Zap className="w-8 h-8 text-teal-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">Animated</h3>
                  <p className="text-sm text-gray-400">Beautiful entry animations and hover effects</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <Settings className="w-8 h-8 text-teal-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">Customizable</h3>
                  <p className="text-sm text-gray-400">Easy to modify colors, effects, and styling</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
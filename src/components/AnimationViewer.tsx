import React, { useState } from 'react';
import { 
  Eye, 
  Code, 
  Terminal, 
  Copy, 
  Check, 
  Download,
  Settings,
  Palette,
  Zap,
  RefreshCw,
  Star
} from 'lucide-react';

interface AnimationViewerProps {
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  installation?: string;
  usage: string;
  customizationProps?: Array<{
    name: string;
    type: string;
    default: any;
    description: string;
    options?: any[];
  }>;
  onPropsChange?: (props: any) => void;
  currentProps?: any;
}

export const AnimationViewer: React.FC<AnimationViewerProps> = ({
  title,
  description,
  component,
  code,
  installation,
  usage,
  customizationProps = [],
  onPropsChange,
  currentProps = {}
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'cli'>('preview');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePropChange = (propName: string, value: any) => {
    if (onPropsChange) {
      onPropsChange({
        ...currentProps,
        [propName]: value
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-400 text-lg">{description}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => copyToClipboard(code, 'component')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied === 'component' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied === 'component' ? 'Copied!' : 'Copy Code'}</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Star className="w-4 h-4" />
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="flex">
          {[
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'code', label: 'Code', icon: Code },
            { id: 'cli', label: 'CLI', icon: Terminal }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400 bg-gray-800/50'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {activeTab === 'preview' && (
            <div className="space-y-8">
              {/* Demo Area */}
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-white font-medium">Live Preview</h3>
                  <button className="text-gray-400 hover:text-gray-200 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-8 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                  {component}
                </div>
              </div>

              {/* Usage Example */}
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700">
                  <h3 className="text-white font-medium">Usage</h3>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <code>{usage}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-white font-medium">Component Code</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(code, 'code')}
                      className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {copied === 'code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-xs">{copied === 'code' ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => downloadFile(code, `${title.toLowerCase().replace(/\s+/g, '-')}.tsx`)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-xs">Download</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4 overflow-x-auto max-h-96">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-6">
              {installation && (
                <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                  <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
                    <h3 className="text-white font-medium">Installation</h3>
                    <button
                      onClick={() => copyToClipboard(installation, 'install')}
                      className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {copied === 'install' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-xs">{copied === 'install' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4">
                      <code>{installation}</code>
                    </pre>
                  </div>
                </div>
              )}

              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700">
                  <h3 className="text-white font-medium">CLI Commands</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Add Component</h4>
                    <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4">
                      <code>npx kauryui-cli add {title.toLowerCase().replace(/\s+/g, '-')}</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Copy to Clipboard</h4>
                    <pre className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4">
                      <code>npx kauryui-cli copy {title.toLowerCase().replace(/\s+/g, '-')}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Customization Sidebar */}
        {activeTab === 'preview' && customizationProps.length > 0 && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-5 h-5 text-gray-400" />
              <h3 className="text-white font-medium">Customize</h3>
            </div>

            <div className="space-y-6">
              {customizationProps.map((prop) => (
                <div key={prop.name}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {prop.name}
                  </label>
                  <p className="text-xs text-gray-500 mb-3">{prop.description}</p>
                  
                  {prop.type === 'string' && (
                    <input
                      type="text"
                      value={currentProps[prop.name] || prop.default}
                      onChange={(e) => handlePropChange(prop.name, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                  
                  {prop.type === 'number' && (
                    <input
                      type="number"
                      value={currentProps[prop.name] || prop.default}
                      onChange={(e) => handlePropChange(prop.name, Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                  
                  {prop.type === 'boolean' && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentProps[prop.name] ?? prop.default}
                        onChange={(e) => handlePropChange(prop.name, e.target.checked)}
                        className="mr-2 rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">Enable</span>
                    </label>
                  )}
                  
                  {prop.type === 'select' && prop.options && (
                    <select
                      value={currentProps[prop.name] || prop.default}
                      onChange={(e) => handlePropChange(prop.name, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {prop.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {prop.type === 'color' && (
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={currentProps[prop.name] || prop.default}
                        onChange={(e) => handlePropChange(prop.name, e.target.value)}
                        className="w-12 h-8 border border-gray-700 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentProps[prop.name] || prop.default}
                        onChange={(e) => handlePropChange(prop.name, e.target.value)}
                        className="flex-1 px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  
                  {prop.type === 'range' && (
                    <div>
                      <input
                        type="range"
                        min={prop.options?.[0] || 0}
                        max={prop.options?.[1] || 100}
                        step={prop.options?.[2] || 1}
                        value={currentProps[prop.name] || prop.default}
                        onChange={(e) => handlePropChange(prop.name, Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{prop.options?.[0] || 0}</span>
                        <span className="text-white">{currentProps[prop.name] || prop.default}</span>
                        <span>{prop.options?.[1] || 100}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
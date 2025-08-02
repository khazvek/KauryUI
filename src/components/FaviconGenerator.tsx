import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Image, 
  Type, 
  Download,
  Upload,
  Palette,
  Settings,
  Sparkles,
  Copy,
  Check,
  X,
  Loader2
} from 'lucide-react';

interface FaviconGeneratorProps {
  onNavigate: (view: string) => void;
}

interface FaviconOptions {
  textInput: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  borderRadius: number;
  selectedImage: string | null;
  cropMode: 'center' | 'fit' | 'fill';
  activeTab: 'text' | 'image';
}

export const FaviconGenerator: React.FC<FaviconGeneratorProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('K');
  const [backgroundColor, setBackgroundColor] = useState('#1F2937');
  const [textColor, setTextColor] = useState('#60A5FA');
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');
  const [borderRadius, setBorderRadius] = useState(8);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Image-related states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cropMode, setCropMode] = useState<'center' | 'fit' | 'fill'>('center');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Standard favicon sizes
  const faviconSizes = [16, 32, 48, 64, 96, 128, 180, 192, 512];

  // Function to create rounded rectangle path
  const createRoundedRectPath = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Function to draw favicon on canvas
  const drawFaviconOnCanvas = async (options: FaviconOptions, size: number): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Enable anti-aliasing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Calculate border radius (max 25% of size)
      const radius = Math.min(options.borderRadius, size * 0.25);

      // Draw background with rounded corners
      if (radius > 0) {
        createRoundedRectPath(ctx, 0, 0, size, size, radius);
        ctx.fillStyle = options.backgroundColor;
        ctx.fill();
        ctx.clip(); // Clip future drawings to rounded rectangle
      } else {
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, size, size);
      }

      if (options.activeTab === 'image' && options.selectedImage) {
        // Draw image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          try {
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            let drawX = 0;
            let drawY = 0;
            let drawWidth = size;
            let drawHeight = size;
            
            if (options.cropMode === 'fit') {
              // Fit image inside canvas while maintaining aspect ratio
              const scale = Math.min(size / imgWidth, size / imgHeight);
              drawWidth = imgWidth * scale * 0.8; // 80% to add some padding
              drawHeight = imgHeight * scale * 0.8;
              drawX = (size - drawWidth) / 2;
              drawY = (size - drawHeight) / 2;
            } else if (options.cropMode === 'center') {
              // Center crop - fill canvas while maintaining aspect ratio
              const scale = Math.max(size / imgWidth, size / imgHeight);
              const scaledWidth = imgWidth * scale;
              const scaledHeight = imgHeight * scale;
              drawX = (size - scaledWidth) / 2;
              drawY = (size - scaledHeight) / 2;
              drawWidth = scaledWidth;
              drawHeight = scaledHeight;
            } else {
              // Fill - stretch to fill canvas
              drawWidth = size;
              drawHeight = size;
            }
            
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            resolve(canvas);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = options.selectedImage;
      } else {
        // Draw text
        const scaledFontSize = Math.max(size * 0.5, 8);
        ctx.font = `bold ${scaledFontSize}px ${options.fontFamily}`;
        ctx.fillStyle = options.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const centerX = size / 2;
        const centerY = size / 2;
        
        ctx.fillText(options.textInput, centerX, centerY);
        resolve(canvas);
      }
    });
  };

  // Function to download canvas as PNG
  const downloadCanvasAsPNG = (canvas: HTMLCanvasElement, filename: string) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  // Main favicon generation function
  const generateFavicon = async () => {
    setIsGenerating(true);
    
    try {
      const options: FaviconOptions = {
        textInput,
        backgroundColor,
        textColor,
        fontSize,
        fontFamily,
        borderRadius,
        selectedImage,
        cropMode,
        activeTab
      };

      // Generate favicons for all standard sizes
      for (const size of faviconSizes) {
        try {
          const canvas = await drawFaviconOnCanvas(options, size);
          
          let filename: string;
          if (size === 180) {
            filename = 'apple-touch-icon.png';
          } else if (size === 192) {
            filename = 'android-chrome-192x192.png';
          } else if (size === 512) {
            filename = 'android-chrome-512x512.png';
          } else {
            filename = `favicon-${size}x${size}.png`;
          }
          
          downloadCanvasAsPNG(canvas, filename);
          
          // Small delay between downloads to avoid overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to generate ${size}x${size} favicon:`, error);
        }
      }

      // Generate web manifest file
      const manifest = {
        name: "My Website",
        short_name: "Website",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: backgroundColor,
        background_color: backgroundColor,
        display: "standalone"
      };

      const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], {
        type: 'application/json'
      });
      const manifestUrl = URL.createObjectURL(manifestBlob);
      const manifestLink = document.createElement('a');
      manifestLink.href = manifestUrl;
      manifestLink.download = 'site.webmanifest';
      document.body.appendChild(manifestLink);
      manifestLink.click();
      document.body.removeChild(manifestLink);
      URL.revokeObjectURL(manifestUrl);

    } catch (error) {
      console.error('Failed to generate favicons:', error);
      alert('Failed to generate favicons. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const htmlCode = `<!-- Add this to your HTML <head> section -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${backgroundColor}">`;

    navigator.clipboard.writeText(htmlCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, SVG)');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderPreview = (size: number) => {
    if (activeTab === 'image' && selectedImage) {
      return (
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: backgroundColor,
            borderRadius: `${Math.min(borderRadius, size * 0.25)}px`,
          }}
        >
          <img
            src={selectedImage}
            alt="Favicon preview"
            className={`${
              cropMode === 'center' ? 'object-cover' :
              cropMode === 'fit' ? 'object-contain' : 'object-cover'
            }`}
            style={{
              width: cropMode === 'fit' ? '80%' : '100%',
              height: cropMode === 'fit' ? '80%' : '100%',
            }}
          />
        </div>
      );
    }

    // Text preview
    return (
      <div
        className="flex items-center justify-center font-bold"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: backgroundColor,
          color: textColor,
          fontSize: `${Math.max(size * 0.5, 8)}px`,
          fontFamily: fontFamily,
          borderRadius: `${Math.min(borderRadius, size * 0.25)}px`,
        }}
      >
        {textInput}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Favicon Generator</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Create favicons from text or images</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'text'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Text</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'image'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Image</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'text' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Text</label>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter text (1-2 characters work best)"
                  maxLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Impact, sans-serif">Impact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-8 border border-gray-600 rounded cursor-pointer bg-gray-700"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-6">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {!selectedImage ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drop your image here or click to browse</p>
                  <p className="text-xs text-gray-500">Supports PNG, JPG, SVG (max 5MB)</p>
                  <button 
                    onClick={handleFileSelect}
                    className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Choose File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Image preview */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-300">Selected Image</h3>
                      <button
                        onClick={removeImage}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center bg-gray-600 rounded-lg p-4">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-full max-h-32 object-contain rounded"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {imageFile?.name} ({Math.round((imageFile?.size || 0) / 1024)}KB)
                    </p>
                  </div>

                  {/* Change image button */}
                  <button
                    onClick={handleFileSelect}
                    className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    Change Image
                  </button>
                </div>
              )}

              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Image Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Crop Mode</label>
                    <select 
                      value={cropMode}
                      onChange={(e) => setCropMode(e.target.value as 'center' | 'fit' | 'fill')}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="center">Center Crop</option>
                      <option value="fit">Fit</option>
                      <option value="fill">Fill</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common settings for both tabs */}
          <div className="space-y-6 mt-6 pt-6 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-8 border border-gray-600 rounded cursor-pointer bg-gray-700"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius: {borderRadius}px</label>
              <input
                type="range"
                min="0"
                max="32"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={generateFavicon}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 disabled:bg-orange-800 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate & Download</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy HTML Code'}</span>
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 p-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Preview</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Live Preview */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
              <div className="flex items-center justify-center bg-gray-700 rounded-lg p-8">
                {renderPreview(64)}
              </div>
            </div>

            {/* Size Variations */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Size Variations</h3>
              <div className="grid grid-cols-4 gap-4">
                {[16, 32, 48, 64].map((size) => (
                  <div key={size} className="text-center">
                    <div className="mx-auto mb-2">
                      {renderPreview(size)}
                    </div>
                    <span className="text-xs text-gray-400">{size}×{size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Preview */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Browser Tab Preview</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 bg-gray-600 rounded-t-lg px-3 py-2">
                  {renderPreview(16)}
                  <span className="text-sm text-gray-300 ml-2">My Website</span>
                  <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center ml-auto">
                    <span className="text-xs text-gray-300">×</span>
                  </div>
                </div>
                <div className="bg-white h-32 rounded-b-lg flex items-center justify-center">
                  <span className="text-gray-500">Website content...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Files Info */}
          <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Files</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">Standard Favicons:</h4>
                <ul className="space-y-1">
                  <li>• favicon-16x16.png</li>
                  <li>• favicon-32x32.png</li>
                  <li>• favicon-48x48.png</li>
                  <li>• favicon-64x64.png</li>
                  <li>• favicon-96x96.png</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Mobile & PWA:</h4>
                <ul className="space-y-1">
                  <li>• apple-touch-icon.png (180x180)</li>
                  <li>• android-chrome-192x192.png</li>
                  <li>• android-chrome-512x512.png</li>
                  <li>• site.webmanifest</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">HTML Code</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`<!-- Add this to your HTML <head> section -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${backgroundColor}">`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};
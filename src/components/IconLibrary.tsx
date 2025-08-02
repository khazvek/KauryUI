import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Copy,
  Check,
  Download,
  Grid3X3,
  List,
  Palette,
  Settings,
  Star,
  Heart,
  Bookmark,
  Filter,
  X,
  Package,
  Zap,
  Sparkles
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IconLibraryProps {
  onNavigate: (view: string) => void;
}

interface IconItem {
  name: string;
  component: React.ComponentType<any>;
  category: string;
  tags: string[];
}

export const IconLibrary: React.FC<IconLibraryProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [iconSize, setIconSize] = useState(24);
  const [showCopyFormat, setShowCopyFormat] = useState(false);
  const [copyFormat, setCopyFormat] = useState<'component' | 'svg' | 'name'>('component');

  // Get all Lucide icons dynamically
  const allIcons = useMemo(() => {
    const iconEntries = Object.entries(LucideIcons).filter(([name, component]) => 
      typeof component === 'function' && 
      name !== 'createLucideIcon' &&
      name !== 'Icon'
    );

    return iconEntries.map(([name, component]) => {
      // Categorize icons based on their names
      let category = 'general';
      const lowerName = name.toLowerCase();
      
      if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('move')) {
        category = 'arrows';
      } else if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document')) {
        category = 'files';
      } else if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('profile')) {
        category = 'users';
      } else if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('chat')) {
        category = 'communication';
      } else if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('thumb')) {
        category = 'social';
      } else if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music')) {
        category = 'media';
      } else if (lowerName.includes('shopping') || lowerName.includes('cart') || lowerName.includes('credit')) {
        category = 'commerce';
      } else if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('tool')) {
        category = 'settings';
      } else if (lowerName.includes('home') || lowerName.includes('building') || lowerName.includes('map')) {
        category = 'places';
      } else if (lowerName.includes('weather') || lowerName.includes('sun') || lowerName.includes('cloud')) {
        category = 'weather';
      }

      // Generate tags for better search
      const tags = [
        name.toLowerCase(),
        ...name.split(/(?=[A-Z])/).map(part => part.toLowerCase()),
        category
      ];

      return {
        name,
        component: component as React.ComponentType<any>,
        category,
        tags
      };
    });
  }, []);

  const categories = [
    { id: 'all', label: 'All Icons', count: allIcons.length },
    { id: 'arrows', label: 'Arrows', count: allIcons.filter(icon => icon.category === 'arrows').length },
    { id: 'files', label: 'Files', count: allIcons.filter(icon => icon.category === 'files').length },
    { id: 'users', label: 'Users', count: allIcons.filter(icon => icon.category === 'users').length },
    { id: 'communication', label: 'Communication', count: allIcons.filter(icon => icon.category === 'communication').length },
    { id: 'social', label: 'Social', count: allIcons.filter(icon => icon.category === 'social').length },
    { id: 'media', label: 'Media', count: allIcons.filter(icon => icon.category === 'media').length },
    { id: 'commerce', label: 'Commerce', count: allIcons.filter(icon => icon.category === 'commerce').length },
    { id: 'settings', label: 'Settings', count: allIcons.filter(icon => icon.category === 'settings').length },
    { id: 'places', label: 'Places', count: allIcons.filter(icon => icon.category === 'places').length },
    { id: 'weather', label: 'Weather', count: allIcons.filter(icon => icon.category === 'weather').length },
    { id: 'general', label: 'General', count: allIcons.filter(icon => icon.category === 'general').length },
    { id: 'favorites', label: 'Favorites', count: favorites.size }
  ].filter(cat => cat.count > 0);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    let filtered = allIcons;

    // Filter by category
    if (selectedCategory === 'favorites') {
      filtered = filtered.filter(icon => favorites.has(icon.name));
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(icon => icon.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(icon => 
        icon.tags.some(tag => tag.includes(searchLower))
      );
    }

    return filtered;
  }, [allIcons, searchTerm, selectedCategory, favorites]);

  const copyIconCode = async (icon: IconItem) => {
    let code = '';
    
    switch (copyFormat) {
      case 'component':
        code = `<${icon.name} size={${iconSize}} />`;
        break;
      case 'svg':
        // This would require rendering the icon to SVG, simplified for demo
        code = `import { ${icon.name} } from 'lucide-react';\n\n<${icon.name} size={${iconSize}} />`;
        break;
      case 'name':
        code = icon.name;
        break;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopiedIcon(icon.name);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleFavorite = (iconName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(iconName)) {
      newFavorites.delete(iconName);
    } else {
      newFavorites.add(iconName);
    }
    setFavorites(newFavorites);
  };

  const downloadIcon = (icon: IconItem) => {
    // Create SVG string (simplified version)
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- ${icon.name} icon content would be here -->
  <text x="12" y="12" text-anchor="middle" dy=".3em" font-size="8">${icon.name}</text>
</svg>`;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${icon.name}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Icon Library</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Curated collection of modern icons</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-white mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{category.label}</span>
                <span className="text-xs opacity-75">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon Size: {iconSize}px</label>
            <input
              type="range"
              min="16"
              max="48"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Copy Format</label>
            <select
              value={copyFormat}
              onChange={(e) => setCopyFormat(e.target.value as 'component' | 'svg' | 'name')}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="component">React Component</option>
              <option value="svg">SVG Code</option>
              <option value="name">Icon Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedCategory === 'all' ? 'All Icons' : 
                 selectedCategory === 'favorites' ? 'Favorite Icons' :
                 categories.find(c => c.id === selectedCategory)?.label || 'Icons'}
              </h2>
              <p className="text-gray-400">
                {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} 
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Icons Grid/List */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {filteredIcons.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-lg mb-2">No icons found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                : "space-y-2"
            }>
              {filteredIcons.map((icon) => {
                const IconComponent = icon.component;
                const isFavorite = favorites.has(icon.name);
                const isCopied = copiedIcon === icon.name;

                if (viewMode === 'list') {
                  return (
                    <div
                      key={icon.name}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
                          <IconComponent size={iconSize} className="text-gray-300" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{icon.name}</div>
                          <div className="text-xs text-gray-400 capitalize">{icon.category}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleFavorite(icon.name)}
                          className={`p-2 rounded-lg transition-colors ${
                            isFavorite ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => downloadIcon(icon)}
                          className="p-2 text-gray-400 hover:text-gray-200 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyIconCode(icon)}
                          className={`p-2 rounded-lg transition-colors ${
                            isCopied ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={icon.name}
                    className="group relative bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105 cursor-pointer"
                    onClick={() => copyIconCode(icon)}
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(icon.name);
                      }}
                      className={`absolute top-2 right-2 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100 ${
                        isFavorite ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    {/* Icon */}
                    <div className="flex items-center justify-center h-16 mb-3">
                      <IconComponent 
                        size={iconSize} 
                        className="text-gray-300 group-hover:text-white transition-colors" 
                      />
                    </div>

                    {/* Icon Name */}
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium truncate">
                        {icon.name}
                      </div>
                    </div>

                    {/* Copy Feedback */}
                    {isCopied && (
                      <div className="absolute inset-0 bg-green-600/20 border border-green-500 rounded-xl flex items-center justify-center">
                        <div className="flex items-center space-x-1 text-green-400 text-xs font-medium">
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </div>
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadIcon(icon);
                        }}
                        className="p-1 bg-gray-700 rounded text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>
              Showing {filteredIcons.length} of {allIcons.length} icons
            </div>
            <div className="flex items-center space-x-4">
              <span>{favorites.size} favorites</span>
              <span>•</span>
              <span>Size: {iconSize}px</span>
              <span>•</span>
              <span className="capitalize">Format: {copyFormat}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
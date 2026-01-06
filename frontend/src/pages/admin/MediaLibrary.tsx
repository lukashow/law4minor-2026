import { useState } from 'react';

const mockMedia = [
  { id: '1', name: 'hero-image.jpg', type: 'image', size: '2.4 MB', date: 'June 15, 2025', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=200&q=80' },
  { id: '2', name: 'team-photo.jpg', type: 'image', size: '1.8 MB', date: 'June 10, 2025', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
  { id: '3', name: 'article-cover.jpg', type: 'image', size: '1.2 MB', date: 'June 5, 2025', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=200&q=80' },
  { id: '4', name: 'logo.png', type: 'image', size: '156 KB', date: 'Jan 1, 2025', url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=200&q=80' },
];

export function MediaLibrary() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">Media Library</h1>
        <button className="btn btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Files
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
            <option>All Types</option>
            <option>Images</option>
            <option>Documents</option>
            <option>Videos</option>
          </select>
          {selectedItems.length > 0 && (
            <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              Delete Selected ({selectedItems.length})
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}>
        {mockMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all ${
              selectedItems.includes(item.id) ? 'ring-2 ring-[var(--color-accent)]' : 'hover:shadow-md'
            } ${viewMode === 'list' ? 'flex items-center p-4' : ''}`}
          >
            <div className={viewMode === 'grid' ? 'aspect-square' : 'w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden'}>
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={viewMode === 'grid' ? 'p-3' : 'ml-4 flex-1'}>
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-gray-500">{item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

interface Media {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  createdAt: string;
}

export function MediaLibrary() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [editData, setEditData] = useState({ alt: '', caption: '' });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const data = await api.get('/media');
      setMedia(data.items || []);
    } catch (err) {
      console.error('Failed to fetch media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:3001/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        // The media endpoint returns the created media record
        await fetchMedia();
      } catch (err) {
        console.error('Failed to upload file:', err);
      }
    }
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelect = (item: Media) => {
    setSelectedMedia(item);
    setEditData({ alt: item.alt || '', caption: item.caption || '' });
  };

  const handleSaveMetadata = async () => {
    if (!selectedMedia) return;
    setSaving(true);
    try {
      await api.put(`/media/${selectedMedia.id}`, editData);
      setMedia(media.map(m => m.id === selectedMedia.id ? { ...m, ...editData } : m));
      setSelectedMedia({ ...selectedMedia, ...editData });
    } catch (err) {
      console.error('Failed to save metadata:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this file permanently?')) return;
    try {
      await api.delete(`/media/${id}`);
      setSelectedMedia(null);
      fetchMedia();
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return <div className="p-8 text-center">Loading media...</div>;
  }

  // Helper to get correct image URL
  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) {
      // If it points to localhost:5173/5174 (frontend), redirect to backend
      if (url.includes('localhost:5173') || url.includes('localhost:5174')) {
        return url.replace(/localhost:517[34]/, 'localhost:3001');
      }
      return url;
    }
    // Relative URL - prepend backend
    return `http://localhost:3001${url.startsWith('/') ? url : '/' + url}`;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 font-serif">Media Library</h1>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="btn btn-primary"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Files
                </>
              )}
            </button>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-auto">
          {media.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No files uploaded yet</p>
              <p className="text-sm mt-1">Upload images, videos, or documents to get started</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 btn btn-primary"
              >
                Upload Files
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedMedia?.id === item.id ? 'border-teal-500 ring-2 ring-teal-200' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {item.mimeType.startsWith('image/') ? (
                    <img src={getImageUrl(item.url)} alt={item.alt || item.filename} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-xs text-gray-500 mt-2 truncate max-w-full">{item.filename}</span>
                    </div>
                  )}
                  {selectedMedia?.id === item.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {media.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`cursor-pointer ${
                      selectedMedia?.id === item.id ? 'bg-teal-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                          {item.mimeType.startsWith('image/') ? (
                            <img src={getImageUrl(item.url)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-800 truncate max-w-xs">{item.filename}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.mimeType.split('/')[1]?.toUpperCase()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatSize(item.size)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Metadata Sidebar */}
      {selectedMedia && (
        <div className="w-80 bg-white border-l border-gray-200 ml-4 rounded-xl shadow-sm overflow-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">File Details</h3>
            <button
              onClick={() => setSelectedMedia(null)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Preview */}
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {selectedMedia.mimeType.startsWith('image/') ? (
                <img src={getImageUrl(selectedMedia.url)} alt="" className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Filename</span>
                <span className="text-gray-800 font-medium truncate max-w-[180px]">{selectedMedia.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="text-gray-800">{selectedMedia.mimeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size</span>
                <span className="text-gray-800">{formatSize(selectedMedia.size)}</span>
              </div>
              {selectedMedia.width && selectedMedia.height && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="text-gray-800">{selectedMedia.width} × {selectedMedia.height}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Uploaded</span>
                <span className="text-gray-800">{new Date(selectedMedia.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Editable Metadata */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editData.alt}
                  onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <textarea
                  value={editData.caption}
                  onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  placeholder="Optional caption"
                />
              </div>
              <button
                onClick={handleSaveMetadata}
                disabled={saving}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Permalink */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">Permalink</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedMedia.url.startsWith('http') ? selectedMedia.url : `http://localhost:3001${selectedMedia.url}`}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(selectedMedia.url.startsWith('http') ? selectedMedia.url : `http://localhost:3001${selectedMedia.url}`)}
                  className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(selectedMedia.id)}
              className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

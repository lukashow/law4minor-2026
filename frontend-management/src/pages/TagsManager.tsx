import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Tag {
  id: string;
  name: string;
  _count?: { articles: number };
}

export function TagsManager() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await api.get('/tags');
      setTags(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Tag name is required');
      return;
    }

    try {
      if (editingTag) {
        await api.put(`/tags/${editingTag.id}`, { name });
      } else {
        await api.post('/tags', { name });
      }
      setIsModalOpen(false);
      setName('');
      setEditingTag(null);
      fetchTags();
    } catch (err: any) {
      setError(err.message || 'Failed to save tag');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this tag?')) return;
    try {
      await api.delete(`/tags/${id}`);
      fetchTags();
    } catch (err) {
      console.error('Failed to delete tag:', err);
    }
  };

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag);
    setName(tag.name);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading tags...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">Tags</h1>
        <button
          onClick={() => {
            setEditingTag(null);
            setName('');
            setIsModalOpen(true);
          }}
          className="btn btn-primary"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Tag
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {tags.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p>No tags yet</p>
            <p className="text-sm mt-2">Create your first tag to label articles</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="group flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span className="font-medium text-gray-700">{tag.name}</span>
                  <span className="text-sm text-gray-500">({tag._count?.articles || 0})</span>
                  <div className="hidden group-hover:flex items-center gap-1 ml-2">
                    <button
                      onClick={() => openEditModal(tag)}
                      className="p-1 text-gray-400 hover:text-teal-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingTag ? 'Edit Tag' : 'New Tag'}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Tag name"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary">
                  {editingTag ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setName('');
                    setEditingTag(null);
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

const mockComments = [
  { id: '1', author: 'Student A', email: 'student@example.com', content: 'This article really helped me understand my rights!', article: 'The Legality of Spotchecks', status: 'Pending', date: 'June 16, 2025' },
  { id: '2', author: 'Teacher B', email: 'teacher@example.com', content: 'Great resource for educators.', article: 'Minor Emancipation', status: 'Approved', date: 'June 15, 2025' },
  { id: '3', author: 'Parent C', email: 'parent@example.com', content: 'Very informative!', article: 'Law & Order in Media', status: 'Pending', date: 'March 31, 2025' },
];

export function CommentsManager() {
  const [filter, setFilter] = useState('All');

  const filteredComments = filter === 'All'
    ? mockComments
    : mockComments.filter(c => c.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">Comments</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {['All', 'Pending', 'Approved'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === status
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status}
            {status === 'Pending' && (
              <span className="ml-2 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-xs rounded-full">
                {mockComments.filter(c => c.status === 'Pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{comment.author}</p>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  comment.status === 'Approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {comment.status}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{comment.content}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                On: <span className="text-[var(--color-accent)]">{comment.article}</span> • {comment.date}
              </div>
              <div className="flex gap-2">
                {comment.status === 'Pending' && (
                  <button className="px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    Approve
                  </button>
                )}
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Reply
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

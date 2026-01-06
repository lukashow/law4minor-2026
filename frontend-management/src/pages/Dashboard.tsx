import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Total Articles', value: '...', change: 'Loading...', color: 'bg-blue-500' },
    { label: 'Total Events', value: '...', change: 'Loading...', color: 'bg-green-500' },
    { label: 'Team Members', value: '...', change: 'Loading...', color: 'bg-yellow-500' },
    { label: 'Media Files', value: '...', change: 'Loading...', color: 'bg-purple-500' },
  ]);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [posts, events, users, media] = await Promise.all([
        api.get('/posts', { perPage: '1' }).catch(() => ({ totalItems: 0 })),
        api.get('/events', { perPage: '1' }).catch(() => ({ totalItems: 0 })),
        api.get('/users', { isTeamMember: 'true' }).catch(() => []),
        api.get('/media', { perPage: '1' }).catch(() => ({ totalItems: 0 })),
      ]);

      const recentPosts = await api.get('/posts', { perPage: '5' }).catch(() => ({ items: [] }));

      setStats([
        { label: 'Total Articles', value: (posts.totalItems || 0).toString(), change: 'Published & drafts', color: 'bg-blue-500' },
        { label: 'Total Events', value: (events.totalItems || 0).toString(), change: 'Upcoming & past', color: 'bg-green-500' },
        { label: 'Team Members', value: (Array.isArray(users) ? users.length : 0).toString(), change: 'Active members', color: 'bg-yellow-500' },
        { label: 'Media Files', value: (media.totalItems || 0).toString(), change: 'Uploaded assets', color: 'bg-purple-500' },
      ]);

      setRecentArticles(recentPosts.items || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">
          Welcome back, {user?.name || 'Admin'}
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with Law4Minor today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg opacity-20`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Recent Articles</h2>
            <Link to="/admin/articles" className="text-sm text-[var(--color-accent)] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentArticles.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">No articles yet. Create your first one!</div>
            ) : (
                recentArticles.map((article) => (
                <div key={article.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{article.title}</p>
                    <p className="text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                        article.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                    >
                    {article.status}
                    </span>
                </div>
                ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link
              to="/admin/articles/new"
              className="p-4 border border-gray-200 rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all group"
            >
              <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p className="font-medium text-gray-800 group-hover:text-[var(--color-accent)]">New Article</p>
            </Link>
            <Link
              to="/admin/events"
              className="p-4 border border-gray-200 rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all group"
            >
              <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-medium text-gray-800 group-hover:text-[var(--color-accent)]">New Event</p>
            </Link>
            <Link
              to="/admin/media"
              className="p-4 border border-gray-200 rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all group"
            >
              <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-medium text-gray-800 group-hover:text-[var(--color-accent)]">Upload Media</p>
            </Link>
            <Link
              to="/admin/categories"
              className="p-4 border border-gray-200 rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all group"
            >
              <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="font-medium text-gray-800 group-hover:text-[var(--color-accent)]">Manage Categories</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

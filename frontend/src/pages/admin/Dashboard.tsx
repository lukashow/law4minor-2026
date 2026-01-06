import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function Dashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Articles', value: '...', change: 'Loading...', color: 'bg-blue-500' },
    { label: 'Total Pages', value: '...', change: 'Loading...', color: 'bg-green-500' },
    { label: 'Pending Comments', value: '...', change: 'Loading...', color: 'bg-yellow-500' },
    { label: 'Media Files', value: '...', change: 'Loading...', color: 'bg-purple-500' },
  ]);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [posts, pages, comments, media, recent] = await Promise.all([
        api.get('/posts', { perPage: '1' }),
        api.get('/pages', { perPage: '1' }),
        api.get('/comments', { perPage: '1', filter: 'status="pending"' }),
        api.get('/media', { perPage: '1' }),
        api.get('/posts', { sort: '-created', perPage: '5', expand: 'author' })
      ]);

      setStats([
        { label: 'Total Articles', value: posts.totalItems.toString(), change: 'Total published & drafts', color: 'bg-blue-500' },
        { label: 'Total Pages', value: pages.totalItems.toString(), change: 'Static content', color: 'bg-green-500' },
        { label: 'Pending Comments', value: comments.totalItems.toString(), change: 'Needs review', color: 'bg-yellow-500' },
        { label: 'Media Files', value: media.totalItems.toString(), change: 'Uploaded assets', color: 'bg-purple-500' },
      ]);

      setRecentArticles(recent.items || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">Welcome back, Admin</h1>
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
                <div className="p-4 text-gray-500 text-center">No recent activity.</div>
            ) : (
                recentArticles.map((article) => (
                <div key={article.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{article.title}</p>
                    <p className="text-sm text-gray-500">{new Date(article.created).toLocaleDateString()}</p>
                    </div>
                    <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                        article.status === 'published'
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
              to="/admin/pages/new"
              className="p-4 border border-gray-200 rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all group"
            >
              <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium text-gray-800 group-hover:text-[var(--color-accent)]">New Page</p>
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
              to="/admin/settings"
              className="p-4 border border-gray-200 rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all group"
            >
              <svg className="w-8 h-8 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-medium text-gray-800 group-hover:text-[var(--color-accent)]">Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

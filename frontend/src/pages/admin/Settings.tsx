import { useState } from 'react';

export function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Law4Minor',
    siteTagline: 'Youth Legal Education Platform',
    adminEmail: 'admin@law4minor.org',
    postsPerPage: '10',
    enableComments: true,
    moderateComments: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your site settings and preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {/* General Settings */}
          <div className="p-6">
            <h2 className="font-semibold text-gray-800 mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings.siteTagline}
                  onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>
          </div>

          {/* Reading Settings */}
          <div className="p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Reading Settings</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posts Per Page</label>
              <input
                type="number"
                value={settings.postsPerPage}
                onChange={(e) => setSettings({ ...settings, postsPerPage: e.target.value })}
                className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </div>

          {/* Discussion Settings */}
          <div className="p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Discussion Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableComments}
                  onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Enable comments on articles</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.moderateComments}
                  onChange={(e) => setSettings({ ...settings, moderateComments: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Moderate comments before publishing</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

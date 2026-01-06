import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { ArticlesManager } from './pages/ArticlesManager';
import { ArticleEditor } from './pages/ArticleEditor';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { MediaLibrary } from './pages/MediaLibrary';
import { UsersManager } from './pages/UsersManager';
import { TeamManager } from './pages/TeamManager';
import { EventsManager } from './pages/EventsManager';
import { CategoriesManager } from './pages/CategoriesManager';
import { TagsManager } from './pages/TagsManager';
import { Settings } from './pages/Settings';
import { CommentsManager } from './pages/CommentsManager';

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="articles" element={<ArticlesManager />} />
        <Route path="articles/:id" element={<ArticleEditor />} />
        <Route path="articles/new" element={<ArticleEditor />} />
        <Route path="categories" element={<CategoriesManager />} />
        <Route path="tags" element={<TagsManager />} />
        <Route path="events" element={<EventsManager />} />
        <Route path="team" element={<TeamManager />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="comments" element={<CommentsManager />} />
        <Route path="users" element={<UsersManager />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

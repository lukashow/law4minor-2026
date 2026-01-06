import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/admin/Sidebar';
import { AdminHeader } from '../components/admin/AdminHeader';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F1F1F1] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

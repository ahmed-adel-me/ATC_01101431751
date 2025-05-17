import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <AdminAuthGuard>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 h-full overflow-y-scroll">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLayout;

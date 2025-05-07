import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

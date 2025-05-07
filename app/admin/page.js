import { getAllEvents } from "@/actions/eventActions";

const AdminPage = async () => {
  // Fetch events data
  const events = await getAllEvents();

  // Example statistics (replace with real data fetching logic)
  const totalEvents = events.length;
  const totalUsers = 120; // Replace with actual user count
  const totalRevenue = events.reduce((sum, event) => sum + event.price, 0); // Sum of event prices

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Welcome to the admin panel. Manage your events and view statistics here.
      </p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Events
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalEvents}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {totalUsers}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Revenue
          </h2>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            ${totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

import { getAllEvents } from "@/actions/eventActions";
import { getTranslations } from "next-intl/server";

const AdminPage = async () => {
  // Fetch events data
  const { total: totalEvents, events } = await getAllEvents();
  const t = await getTranslations("admin");

  const totalUsers = 120; // Replace with actual user count
  const totalRevenue = events.reduce((sum, event) => sum + event.price, 0); // Sum of event prices

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("dashboard")}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{t("welcome")}</p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("totalEvents")}
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalEvents}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("totalUsers")}
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {totalUsers}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t("totalRevenue")}
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

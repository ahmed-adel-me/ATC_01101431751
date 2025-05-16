import { GetTags, AddTag, DeleteTag } from "@/actions/tagActions";
import { getTranslations } from "next-intl/server";

export default async function TagsPage() {
  const tags = await GetTags();
  const t = await getTranslations("tags");

  async function addTag(formData) {
    "use server";
    const name = formData.get("name");
    if (name) {
      await AddTag(name);
    }
  }

  async function deleteTag(formData) {
    "use server";
    const id = formData.get("id");
    if (id) {
      await DeleteTag(id);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-[60vh] py-10 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-purple-700 dark:text-purple-400 text-center">
          {t("manage")}
        </h1>
        <form action={addTag} className="mb-8 flex gap-2">
          <input
            name="name"
            placeholder={t("newPlaceholder")}
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {t("add")}
          </button>
        </form>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {tags.length === 0 ? (
            <li className="py-4 text-center text-gray-500 dark:text-gray-400">
              {t("noTags")}
            </li>
          ) : (
            tags.map((tag) => (
              <li
                key={tag._id}
                className="py-4 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition flex items-center justify-between"
              >
                <span className="text-lg text-gray-800 dark:text-gray-200">
                  {tag.name}
                </span>
                <form action={deleteTag}>
                  <input type="hidden" name="id" value={tag._id} />
                  <button
                    type="submit"
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                  >
                    {t("delete")}
                  </button>
                </form>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

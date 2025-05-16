import { useTranslations } from "next-intl";

export default function CategorySelect({ categories, register, error }) {
  const t = useTranslations("categorySelect");
  return (
    <div>
      <label className="block font-medium mb-1">{t("label")}</label>
      <select
        {...register("category", { required: t("required") })}
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-700"
      >
        <option value="">{t("select")}</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

export default function CategorySelect({ categories, register, error }) {
  return (
    <div>
      <label className="block font-medium mb-1">Category</label>
      <select
        {...register("category", { required: "Category is required" })}
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-700"
      >
        <option value="">Select Category</option>
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

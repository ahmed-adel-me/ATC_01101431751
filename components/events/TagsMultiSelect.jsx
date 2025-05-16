import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function TagsMultiSelect({
  tags,
  selectedTags,
  setValue,
  error,
}) {
  const t = useTranslations("tagsMultiSelect");
  const [open, setOpen] = useState(false);

  const handleTagToggle = (tagId) => {
    const current = new Set(selectedTags);
    if (current.has(tagId)) {
      current.delete(tagId);
    } else {
      current.add(tagId);
    }
    setValue("tags", Array.from(current));
  };

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (!e.target.closest(".tags-dropdown")) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div>
      <label className="block font-medium mb-1">{t("label")}</label>
      <div className="relative tags-dropdown">
        <button
          type="button"
          className="w-full border p-2 rounded text-left bg-gray-50 dark:bg-gray-700"
          onClick={() => setOpen((v) => !v)}
        >
          {selectedTags.length === 0
            ? t("select")
            : tags
                .filter((tag) => selectedTags.includes(tag._id))
                .map((tag) => tag.name)
                .join(", ")}
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg max-h-48 overflow-y-auto">
            {tags.map((tag) => (
              <label
                key={tag._id}
                className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag._id)}
                  onChange={() => handleTagToggle(tag._id)}
                  className="mr-2"
                />
                {tag.name}
              </label>
            ))}
            {tags.length === 0 && (
              <div className="px-3 py-2 text-gray-500">{t("noTags")}</div>
            )}
          </div>
        )}
      </div>
      {/* Hidden input for react-hook-form */}
      <input type="hidden" name="tags" value={selectedTags} readOnly />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

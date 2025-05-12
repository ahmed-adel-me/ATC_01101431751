import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Spinner size={70} />
    </div>
  );
}

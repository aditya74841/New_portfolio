export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
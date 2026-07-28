export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Here is a quick overview of your system.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
          <p className="text-xs font-medium text-gray-500">Authentication Status</p>
          <p className="text-xl font-semibold text-green-600 mt-2">Active (Token Verified)</p>
        </div>
      </div>
    </div>
  );
}
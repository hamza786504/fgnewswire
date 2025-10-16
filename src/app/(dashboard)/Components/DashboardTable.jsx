export default function DashboardTable() {
  return (
    <div className="bg-white shadow-md rounded">
      <div className="flex items-center p-4 border-b">
        <input
          type="text"
          placeholder="Search PressRelease..."
          className="border px-3 py-2 w-full max-w-md rounded-md text-sm"
        />
        <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
          🔍
        </button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">PR No.</th>
            <th className="px-4 py-2">Press Release Title</th>
            <th className="px-4 py-2">Package Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td colSpan="6" className="py-6 text-blue-600 font-semibold">
              No Press Releases Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

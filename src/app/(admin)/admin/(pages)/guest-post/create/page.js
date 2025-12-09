import { BiSearch } from 'react-icons/bi';


export default function GuestPostCreate() {

  return (
    <>
      {/* Main content */}
      <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Before getting start please select guest post package</h1>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Credit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expire At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">

                      <p className="text-black text-xs"><span className="text-blue-600 font-bold">You don't have any package yet. </span> Buy Guest Post package</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {/* Pagination would go here */}
          </div>
        </div>
      </main>
    </>
  );
}
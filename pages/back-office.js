import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FiEdit2, FiEye, FiX, FiPrinter, FiCheck } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../utils/format';

export default function BackOffice() {
  const { user } = useAuth();
  const { loadingSlips, updateLoadingSlip } = useData();
  const [editingSlip, setEditingSlip] = useState(null);
  const [viewingSlip, setViewingSlip] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNo: '',
    gatePassNo: '',
    status: 'confirmed'
  });

  const handleEdit = (slip) => {
    setEditingSlip(slip);
    setFormData({
      invoiceNo: slip.invoiceNo || '',
      gatePassNo: slip.gatePassNo || '',
      status: slip.status
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLoadingSlip(editingSlip.id, {
      ...formData,
      updatedBy: user.name,
      updatedAt: new Date().toISOString()
    });
    setEditingSlip(null);
    setFormData({
      invoiceNo: '',
      gatePassNo: '',
      status: 'confirmed'
    });
  };

  const handlePrint = (slip) => {
    window.print();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Back Office</h1>
          <p className="mt-2 text-gray-600">Final verification and dispatch confirmation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed Loading Slips</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {loadingSlips.filter((s) => s.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dispatched</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {loadingSlips.filter((s) => s.status === 'dispatched').length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Loading Slips</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{loadingSlips.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Slips Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slip No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gate Pass No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loadingSlips.map((slip) => (
                  <tr key={slip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {slip.loadingSlipNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(slip.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {slip.vehicleNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {slip.invoiceNo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {slip.gatePassNo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        slip.status === 'dispatched' ? 'badge-dispatched' : 'badge-approved'
                      }`}>
                        {slip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => setViewingSlip(slip)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye className="w-5 h-5 inline" />
                      </button>
                      <button
                        onClick={() => handleEdit(slip)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiEdit2 className="w-5 h-5 inline" />
                      </button>
                      <button
                        onClick={() => handlePrint(slip)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <FiPrinter className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingSlip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Update Loading Slip</h2>
                <button onClick={() => setEditingSlip(null)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loading Slip No.</label>
                  <input
                    type="text"
                    value={editingSlip.loadingSlipNo}
                    className="input-field bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice No.</label>
                  <input
                    type="text"
                    value={formData.invoiceNo}
                    onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                    className="input-field"
                    placeholder="Enter invoice number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gate Pass No.</label>
                  <input
                    type="text"
                    value={formData.gatePassNo}
                    onChange={(e) => setFormData({ ...formData, gatePassNo: e.target.value })}
                    className="input-field"
                    placeholder="Enter gate pass number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Final Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="input-field"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="dispatched">Dispatched / Left Factory</option>
                    <option value="partial">Partially Delivered</option>
                    <option value="delivered">Fully Delivered</option>
                  </select>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingSlip(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    <FiCheck className="w-5 h-5 inline mr-2" />
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewingSlip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Loading Slip - {viewingSlip.loadingSlipNo}</h2>
                <button onClick={() => setViewingSlip(null)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Loading Slip No.</p>
                    <p className="font-medium">{viewingSlip.loadingSlipNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(viewingSlip.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vehicle No.</p>
                    <p className="font-medium">{viewingSlip.vehicleNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Invoice No.</p>
                    <p className="font-medium">{viewingSlip.invoiceNo || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gate Pass No.</p>
                    <p className="font-medium">{viewingSlip.gatePassNo || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{viewingSlip.status}</p>
                  </div>
                </div>

                {/* Orders Details */}
                {viewingSlip.orders.map((order, orderIdx) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Order {orderIdx + 1}: {order.id}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer Name</p>
                        <p className="font-medium">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{order.customerPhone}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{order.customerAddress}</p>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Thickness</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm">{item.thickness}</td>
                              <td className="px-4 py-2 text-sm">{item.brandName}</td>
                              <td className="px-4 py-2 text-sm">{item.itemName}</td>
                              <td className="px-4 py-2 text-sm">{item.size1} x {item.size2}</td>
                              <td className="px-4 py-2 text-sm">{item.quantity}</td>
                              <td className="px-4 py-2 text-sm">{formatCurrency(item.rateGiven)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Confirmed By</p>
                    <p className="font-medium">{viewingSlip.confirmedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{viewingSlip.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}



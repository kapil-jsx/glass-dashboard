import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FiCheckCircle, FiXCircle, FiClock, FiEye, FiX } from 'react-icons/fi';
import { formatCurrency, formatDate, getStatusBadgeClass } from '../utils/format';

export default function Approvals() {
  const { user } = useAuth();
  const { orders, updateOrder } = useData();
  const [viewingOrder, setViewingOrder] = useState(null);
  const [remarks, setRemarks] = useState('');

  // Filter orders that need approval
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const approvedOrders = orders.filter((o) => o.status === 'approved');
  const holdOrders = orders.filter((o) => o.status === 'hold');
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled');

  const handleApprove = (orderId) => {
    updateOrder(orderId, {
      status: 'approved',
      approvedBy: user.name,
      approvedAt: new Date().toISOString(),
      remarks: remarks
    });
    setRemarks('');
    setViewingOrder(null);
  };

  const handleHold = (orderId) => {
    updateOrder(orderId, {
      status: 'hold',
      holdReason: remarks,
      remarks: remarks
    });
    setRemarks('');
    setViewingOrder(null);
  };

  const handleCancel = (orderId) => {
    updateOrder(orderId, {
      status: 'cancelled',
      cancelledBy: user.name,
      cancelledAt: new Date().toISOString(),
      remarks: remarks
    });
    setRemarks('');
    setViewingOrder(null);
  };

  const stats = {
    pending: pendingOrders.length,
    approved: approvedOrders.length,
    hold: holdOrders.length,
    cancelled: cancelledOrders.length
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Approvals</h1>
          <p className="mt-2 text-gray-600">Review and approve customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Hold</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.hold}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FiClock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Executive
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {pendingOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No pending orders
                    </td>
                  </tr>
                ) : (
                  pendingOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.marketingExecutive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEye className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Order Modal */}
        {viewingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Review Order - {viewingOrder.id}</h2>
                <button onClick={() => setViewingOrder(null)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(viewingOrder.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Marketing Executive</p>
                    <p className="font-medium">{viewingOrder.marketingExecutive}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-medium">{viewingOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{viewingOrder.customerPhone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{viewingOrder.customerAddress}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {viewingOrder.items.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Thickness</p>
                            <p className="font-medium">{item.thickness}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Item</p>
                            <p className="font-medium">{item.itemName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Brand</p>
                            <p className="font-medium">{item.brandName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Size</p>
                            <p className="font-medium">{item.size1} x {item.size2}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quantity</p>
                            <p className="font-medium">{item.quantity}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Rate (Given)</p>
                            <p className="font-medium">{formatCurrency(item.rateGiven)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Rate (List)</p>
                            <p className="font-medium">{formatCurrency(item.rateFromList)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Amount</p>
                            <p className="font-medium">{formatCurrency(item.amount)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remarks */}
                {viewingOrder.remarks && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Remarks</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{viewingOrder.remarks}</p>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(viewingOrder.totalAmount)}
                  </span>
                </div>

                {/* Approval Actions */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Remarks (Optional)
                    </label>
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="input-field"
                      rows="3"
                      placeholder="Add any remarks or notes..."
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => handleCancel(viewingOrder.id)}
                      className="btn-danger"
                    >
                      <FiXCircle className="w-5 h-5 inline mr-2" />
                      Cancel Order
                    </button>
                    <button
                      onClick={() => handleHold(viewingOrder.id)}
                      className="btn-secondary"
                    >
                      <FiClock className="w-5 h-5 inline mr-2" />
                      Hold Order
                    </button>
                    <button
                      onClick={() => handleApprove(viewingOrder.id)}
                      className="btn-success"
                    >
                      <FiCheckCircle className="w-5 h-5 inline mr-2" />
                      Approve Order
                    </button>
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



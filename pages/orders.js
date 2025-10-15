import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX } from 'react-icons/fi';
import { formatCurrency, formatDate, getStatusBadgeClass } from '@/utils/format';
import { generateOrderId } from '@/utils/format';
import { items, brands, thicknessOptions } from '@/data/staticData';

export default function Orders() {
  const { user } = useAuth();
  const { orders, addOrder, updateOrder, deleteOrder } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    marketingExecutive: user?.name || '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    items: [],
    remarks: ''
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: Date.now(),
          thickness: '5 mm',
          itemName: 'GP Clear',
          brandName: 'Saint Gobain',
          size1: '',
          size2: '',
          quantity: 0,
          rateGiven: 0,
          rateFromList: 0,
          amount: 0
        }
      ]
    });
  };

  const handleRemoveItem = (id) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id)
    });
  };

  const handleItemChange = (id, field, value) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rateGiven') {
            updated.amount = updated.quantity * updated.rateGiven;
          }
          return updated;
        }
        return item;
      })
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalAmount = formData.items.reduce((sum, item) => sum + item.amount, 0);
    const orderData = {
      ...formData,
      id: editingOrder ? editingOrder.id : generateOrderId(),
      totalAmount,
      status: editingOrder ? editingOrder.status : 'pending'
    };

    if (editingOrder) {
      updateOrder(editingOrder.id, orderData);
    } else {
      addOrder(orderData);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrder(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      marketingExecutive: user?.name || '',
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      items: [],
      remarks: ''
    });
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      date: order.date,
      marketingExecutive: order.marketingExecutive,
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      customerPhone: order.customerPhone,
      items: order.items,
      remarks: order.remarks
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id);
    }
  };

  const handleView = (order) => {
    setViewingOrder(order);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="mt-2 text-gray-600">Manage customer orders</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center space-x-2">
            <FiPlus className="w-5 h-5" />
            <span>Create Order</span>
          </button>
        </div>

        {/* Orders Table */}
        <div className="card">
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
                    Items
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
                {orders.map((order) => (
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
                      {order.items.length} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleView(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye className="w-5 h-5 inline" />
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleEdit(order)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FiEdit2 className="w-5 h-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="w-5 h-5 inline" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingOrder ? 'Edit Order' : 'Create New Order'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marketing Executive
                    </label>
                    <input
                      type="text"
                      value={formData.marketingExecutive}
                      onChange={(e) => setFormData({ ...formData, marketingExecutive: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.customerAddress}
                      onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                      className="input-field"
                      rows="2"
                      required
                    />
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="btn-secondary text-sm"
                    >
                      <FiPlus className="w-4 h-4 inline mr-1" />
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.items.map((item, index) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Thickness</label>
                            <select
                              value={item.thickness}
                              onChange={(e) => handleItemChange(item.id, 'thickness', e.target.value)}
                              className="input-field text-sm"
                            >
                              {thicknessOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                            <select
                              value={item.itemName}
                              onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                              className="input-field text-sm"
                            >
                              {items.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                            <select
                              value={item.brandName}
                              onChange={(e) => handleItemChange(item.id, 'brandName', e.target.value)}
                              className="input-field text-sm"
                            >
                              {brands.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Size 1</label>
                            <input
                              type="text"
                              value={item.size1}
                              onChange={(e) => handleItemChange(item.id, 'size1', e.target.value)}
                              className="input-field text-sm"
                              placeholder="e.g., 2440"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Size 2</label>
                            <input
                              type="text"
                              value={item.size2}
                              onChange={(e) => handleItemChange(item.id, 'size2', e.target.value)}
                              className="input-field text-sm"
                              placeholder="e.g., 1830"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))}
                              className="input-field text-sm"
                              min="0"
                              step="1"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Rate (Given)</label>
                            <input
                              type="number"
                              value={item.rateGiven}
                              onChange={(e) => handleItemChange(item.id, 'rateGiven', parseFloat(e.target.value))}
                              className="input-field text-sm"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Rate (List)</label>
                            <input
                              type="number"
                              value={item.rateFromList}
                              onChange={(e) => handleItemChange(item.id, 'rateFromList', parseFloat(e.target.value))}
                              className="input-field text-sm"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-700">Amount:</span>
                          <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {formData.items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No items added. Click "Add Item" to add products.
                    </div>
                  )}
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions / Remarks</label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Any special instructions or remarks for this order..."
                  />
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(formData.items.reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formData.items.length === 0}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingOrder ? 'Update Order' : 'Create Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Order Modal */}
        {viewingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Order Details - {viewingOrder.id}</h2>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}



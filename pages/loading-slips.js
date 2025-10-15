import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FiPlus, FiEdit2, FiEye, FiX, FiPrinter, FiCheck } from 'react-icons/fi';
import { formatCurrency, formatDate, generateLoadingSlipNo } from '../utils/format';

export default function LoadingSlips() {
  const { user } = useAuth();
  const { orders, loadingSlips, addLoadingSlip, updateLoadingSlip } = useData();
  const [showModal, setShowModal] = useState(false);
  const [viewingSlip, setViewingSlip] = useState(null);
  const [formData, setFormData] = useState({
    loadingSlipNo: generateLoadingSlipNo(),
    date: new Date().toISOString().split('T')[0],
    vehicleNo: '',
    gatePassNo: '',
    selectedItems: []
  });
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Get approved orders
  const approvedOrders = orders.filter((o) => o.status === 'approved');

  const handleOrderSelect = (orderId) => {
    const order = approvedOrders.find((o) => o.id === orderId);
    if (order && !selectedOrders.find(o => o.id === orderId)) {
      setSelectedOrders([...selectedOrders, order]);
    }
  };

  const handleItemToggle = (orderId, itemId, checked) => {
    const itemKey = `${orderId}-${itemId}`;
    if (checked) {
      const order = approvedOrders.find(o => o.id === orderId);
      const item = order.items.find(i => i.id === itemId);
      setFormData({
        ...formData,
        selectedItems: [...formData.selectedItems, {
          ...item,
          orderId,
          itemKey,
          customerName: order.customerName,
          customerAddress: order.customerAddress,
          customerPhone: order.customerPhone,
          orderBy: order.marketingExecutive
        }]
      });
    } else {
      setFormData({
        ...formData,
        selectedItems: formData.selectedItems.filter(item => item.itemKey !== itemKey)
      });
    }
  };

  const handleCreateRemainingOrder = (orderId) => {
    const order = approvedOrders.find(o => o.id === orderId);
    const selectedItemIds = formData.selectedItems
      .filter(item => item.orderId === orderId)
      .map(item => item.id);
    
    const remainingItems = order.items.filter(item => !selectedItemIds.includes(item.id));
    
    if (remainingItems.length > 0) {
      const newOrder = {
        ...order,
        id: `${order.id}-R${Date.now()}`,
        items: remainingItems,
        totalAmount: remainingItems.reduce((sum, item) => sum + item.amount, 0),
        status: 'approved',
        remarks: `Remaining items from ${order.id}`
      };
      
      // This would typically call an API to create the new order
      console.log('Creating remaining order:', newOrder);
      alert(`New order ${newOrder.id} created for remaining items`);
    }
  };

  const removeOrderFromSelection = (orderId) => {
    setSelectedOrders(selectedOrders.filter(o => o.id !== orderId));
    setFormData({
      ...formData,
      selectedItems: formData.selectedItems.filter(item => item.orderId !== orderId)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Group selected items by order
    const groupedItems = formData.selectedItems.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          customerName: item.customerName,
          customerAddress: item.customerAddress,
          customerPhone: item.customerPhone,
          orderBy: item.orderBy,
          items: []
        };
      }
      acc[item.orderId].items.push(item);
      return acc;
    }, {});
    
    const loadingSlipData = {
      ...formData,
      id: `LS-${Date.now()}`,
      orders: Object.values(groupedItems),
      status: 'confirmed',
      confirmedBy: user.name,
      confirmedAt: new Date().toISOString(),
      invoiceNo: ''
    };

    addLoadingSlip(loadingSlipData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrders([]);
    setFormData({
      loadingSlipNo: generateLoadingSlipNo(),
      date: new Date().toISOString().split('T')[0],
      vehicleNo: '',
      gatePassNo: '',
      selectedItems: []
    });
  };

  const handlePrint = (slip) => {
    window.print();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loading Slips</h1>
            <p className="mt-2 text-gray-600">Create and manage loading slips for dispatch</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center space-x-2">
            <FiPlus className="w-5 h-5" />
            <span>Create Loading Slip</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Loading Slips</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{loadingSlips.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Orders</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{approvedOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready for Dispatch</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {loadingSlips.filter((s) => s.status === 'confirmed').length}
                </p>
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
                    Gate Pass No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slip.gatePassNo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slip.orders.length} order(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge badge-approved">{slip.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => setViewingSlip(slip)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye className="w-5 h-5 inline" />
                      </button>
                      <button
                        onClick={() => handlePrint(slip)}
                        className="text-green-600 hover:text-green-900"
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

        {/* Create Loading Slip Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create Loading Slip</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loading Slip No.</label>
                    <input
                      type="text"
                      value={formData.loadingSlipNo}
                      className="input-field bg-gray-100"
                      readOnly
                    />
                  </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle No.</label>
                    <input
                      type="text"
                      value={formData.vehicleNo}
                      onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
                      className="input-field"
                      placeholder="e.g., MH-01-AB-1234"
                      required
                    />
                  </div>
                </div>

                {/* Select Orders */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Orders for Item Selection</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleOrderSelect(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="input-field"
                  >
                    <option value="">-- Add an approved order --</option>
                    {approvedOrders
                      .filter((o) => !selectedOrders.find((so) => so.id === o.id))
                      .map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.id} - {order.customerName} - {formatCurrency(order.totalAmount)}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Selected Orders with Item Selection */}
                {selectedOrders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select Items for Loading</h3>
                    <div className="space-y-4">
                      {selectedOrders.map((order) => {
                        const selectedItemsForOrder = formData.selectedItems.filter(item => item.orderId === order.id);
                        const allItemsSelected = order.items.every(item => 
                          formData.selectedItems.some(si => si.orderId === order.id && si.id === item.id)
                        );
                        
                        return (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-medium text-gray-900">{order.id}</p>
                                <p className="text-sm text-gray-600">{order.customerName}</p>
                                <p className="text-xs text-gray-500">{selectedItemsForOrder.length}/{order.items.length} items selected</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {!allItemsSelected && (
                                  <button
                                    type="button"
                                    onClick={() => handleCreateRemainingOrder(order.id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    Create Order for Remaining
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeOrderFromSelection(order.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <FiX className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Items with checkboxes */}
                            <div className="space-y-2">
                              {order.items.map((item) => {
                                const isSelected = formData.selectedItems.some(
                                  si => si.orderId === order.id && si.id === item.id
                                );
                                
                                return (
                                  <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded border">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={(e) => handleItemToggle(order.id, item.id, e.target.checked)}
                                      className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
                                      <div>
                                        <p className="text-xs text-gray-600">Thickness</p>
                                        <p className="font-medium">{item.thickness}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Item</p>
                                        <p className="font-medium">{item.itemName}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Brand</p>
                                        <p className="font-medium">{item.brandName}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Size</p>
                                        <p className="font-medium">{item.size1} x {item.size2}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Quantity</p>
                                        <p className="font-medium">{item.quantity} pcs</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Amount</p>
                                        <p className="font-medium">{formatCurrency(item.amount)}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Items Summary */}
                {formData.selectedItems.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Loading Summary</h4>
                    <p className="text-sm text-blue-700">
                      {formData.selectedItems.length} items selected from {new Set(formData.selectedItems.map(item => item.orderId)).size} orders
                    </p>
                    <p className="text-sm text-blue-700">
                      Total Value: {formatCurrency(formData.selectedItems.reduce((sum, item) => sum + item.amount, 0))}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formData.selectedItems.length === 0}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Loading Slip
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Loading Slip Modal */}
        {viewingSlip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Loading Slip - {viewingSlip.loadingSlipNo}</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handlePrint(viewingSlip)}
                    className="btn-secondary text-sm"
                  >
                    <FiPrinter className="w-4 h-4 inline mr-1" />
                    Print
                  </button>
                  <button onClick={() => setViewingSlip(null)} className="text-gray-400 hover:text-gray-600">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
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
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Thickness</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pcs/Qty</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">CD Status</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment Terms</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Invoice No.</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rack Location</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-3 py-2 text-sm">{item.thickness}</td>
                              <td className="px-3 py-2 text-sm">{item.brandName}</td>
                              <td className="px-3 py-2 text-sm">{item.itemName}</td>
                              <td className="px-3 py-2 text-sm">{item.size1} x {item.size2}</td>
                              <td className="px-3 py-2 text-sm">{item.quantity}</td>
                              <td className="px-3 py-2 text-sm">{formatCurrency(item.rateGiven)}</td>
                              <td className="px-3 py-2 text-sm">{item.cdStatus || 'Cash'}</td>
                              <td className="px-3 py-2 text-sm">{item.paymentTerms || 'Cash on delivery'}</td>
                              <td className="px-3 py-2 text-sm">{item.invoiceNo || '-'}</td>
                              <td className="px-3 py-2 text-sm">{item.rackLocation || '-'}</td>
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



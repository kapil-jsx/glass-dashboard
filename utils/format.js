// Utility functions for formatting

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const generateOrderId = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${year}-${month}${day}-${random}`;
};

export const generateLoadingSlipNo = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `LS-${year}-${random}`;
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'yellow',
    approved: 'green',
    hold: 'orange',
    cancelled: 'red',
    dispatched: 'blue',
    partial: 'purple'
  };
  return colors[status] || 'gray';
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-pending',
    approved: 'badge-approved',
    hold: 'badge-hold',
    cancelled: 'badge-cancelled',
    dispatched: 'badge-dispatched',
    partial: 'badge-partial'
  };
  return classes[status] || 'badge bg-gray-100 text-gray-800';
};

export const getRoleColor = (role) => {
  const colors = {
    admin: 'purple',
    marketing: 'blue',
    finance: 'green',
    dispatch: 'orange',
    backoffice: 'indigo'
  };
  return colors[role] || 'gray';
};

export const getRoleLabel = (role) => {
  const labels = {
    admin: 'Admin',
    marketing: 'Marketing Executive',
    finance: 'Finance (Approval)',
    dispatch: 'Dispatch/Warehouse',
    backoffice: 'Back Office'
  };
  return labels[role] || role;
};



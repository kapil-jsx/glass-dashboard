// Static data for the application

export const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    status: 'active'
  },
  {
    id: '2',
    username: 'marketing1',
    password: 'marketing123',
    name: 'John Marketing',
    email: 'john@company.com',
    role: 'marketing',
    status: 'active'
  },
  {
    id: '3',
    username: 'finance1',
    password: 'finance123',
    name: 'Sarah Finance',
    email: 'sarah@company.com',
    role: 'finance',
    status: 'active'
  },
  {
    id: '4',
    username: 'dispatch1',
    password: 'dispatch123',
    name: 'Mike Dispatch',
    email: 'mike@company.com',
    role: 'dispatch',
    status: 'active'
  },
  {
    id: '5',
    username: 'backoffice1',
    password: 'backoffice123',
    name: 'Emma BackOffice',
    email: 'emma@company.com',
    role: 'backoffice',
    status: 'active'
  }
];

export const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    marketingExecutive: 'John Marketing',
    customerName: 'ABC Glass Works',
    customerAddress: '123 Main St, City',
    customerPhone: '9876543210',
    items: [
      {
        id: 1,
        thickness: '5 mm',
        itemName: 'GP Clear',
        brandName: 'Saint Gobain',
        size1: '2440',
        size2: '1830',
        quantity: 100,
        rateGiven: 45.00,
        rateFromList: 42.00,
        amount: 4500.00
      },
      {
        id: 2,
        thickness: '6 mm',
        itemName: 'SGG Mirror',
        brandName: 'Saint Gobain',
        size1: '2440',
        size2: '1830',
        quantity: 50,
        rateGiven: 85.00,
        rateFromList: 80.00,
        amount: 4250.00
      }
    ],
    totalAmount: 8750.00,
    status: 'pending',
    remarks: 'Priority order - Urgent delivery required',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-15T10:30:00'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-14',
    marketingExecutive: 'John Marketing',
    customerName: 'XYZ Glass Solutions',
    customerAddress: '456 Park Ave, City',
    customerPhone: '9876543211',
    items: [
      {
        id: 1,
        thickness: '4 mm',
        itemName: 'GP Clear',
        brandName: 'Asahi',
        size1: '2134',
        size2: '1524',
        quantity: 200,
        rateGiven: 35.00,
        rateFromList: 33.00,
        amount: 7000.00
      }
    ],
    totalAmount: 7000.00,
    status: 'approved',
    remarks: '',
    approvedBy: 'Sarah Finance',
    approvedAt: '2024-01-14T15:20:00',
    createdAt: '2024-01-14T09:00:00',
    updatedAt: '2024-01-14T15:20:00'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-13',
    marketingExecutive: 'John Marketing',
    customerName: 'Premium Glass Co',
    customerAddress: '789 Market St, City',
    customerPhone: '9876543212',
    items: [
      {
        id: 1,
        thickness: '8 mm',
        itemName: 'Toughened Glass',
        brandName: 'Saint Gobain',
        size1: '2440',
        size2: '1830',
        quantity: 75,
        rateGiven: 120.00,
        rateFromList: 115.00,
        amount: 9000.00
      }
    ],
    totalAmount: 9000.00,
    status: 'hold',
    remarks: 'Payment verification pending',
    holdReason: 'Customer has outstanding dues',
    createdAt: '2024-01-13T11:00:00',
    updatedAt: '2024-01-13T14:30:00'
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-12',
    marketingExecutive: 'John Marketing',
    customerName: 'Modern Glass Works',
    customerAddress: '321 Commerce St, City',
    customerPhone: '9876543213',
    items: [
      {
        id: 1,
        thickness: '6 mm',
        itemName: 'GP Clear',
        brandName: 'Guardian',
        size1: '2440',
        size2: '1830',
        quantity: 150,
        rateGiven: 55.00,
        rateFromList: 52.00,
        amount: 8250.00
      }
    ],
    totalAmount: 8250.00,
    status: 'approved',
    remarks: '',
    approvedBy: 'Sarah Finance',
    approvedAt: '2024-01-12T16:00:00',
    createdAt: '2024-01-12T10:00:00',
    updatedAt: '2024-01-12T16:00:00'
  },
  {
    id: 'ORD-2024-005',
    date: '2024-01-11',
    marketingExecutive: 'John Marketing',
    customerName: 'Elite Glass Products',
    customerAddress: '555 Industrial Rd, City',
    customerPhone: '9876543214',
    items: [
      {
        id: 1,
        thickness: '5 mm',
        itemName: 'Laminated Glass',
        brandName: 'Saint Gobain',
        size1: '2440',
        size2: '1830',
        quantity: 80,
        rateGiven: 95.00,
        rateFromList: 90.00,
        amount: 7600.00
      }
    ],
    totalAmount: 7600.00,
    status: 'cancelled',
    remarks: 'Customer cancelled order',
    cancelledBy: 'John Marketing',
    cancelledAt: '2024-01-11T13:00:00',
    createdAt: '2024-01-11T09:00:00',
    updatedAt: '2024-01-11T13:00:00'
  }
];

export const loadingSlips = [
  {
    id: 'LS-2024-001',
    loadingSlipNo: 'LS-001',
    date: '2024-01-16',
    vehicleNo: 'MH-01-AB-1234',
    gatePassNo: 'GP-001',
    orders: [
      {
        orderId: 'ORD-2024-002',
        customerName: 'XYZ Glass Solutions',
        customerAddress: '456 Park Ave, City',
        customerPhone: '9876543211',
        orderBy: 'John Marketing',
        items: [
          {
            thickness: '4 mm',
            companyName: 'Asahi',
            item: 'GP Clear',
            size1: '2134',
            size2: '1524',
            pcsQuantity: 200,
            agreedRate: 35.00,
            cdStatus: 'Credit 30 days',
            difference: 0,
            paymentTerms: 'Net 30',
            invoiceNo: 'INV-2024-001',
            rackLocation: 'A-12'
          }
        ]
      }
    ],
    status: 'confirmed',
    confirmedBy: 'Mike Dispatch',
    confirmedAt: '2024-01-16T09:00:00',
    invoiceNo: 'INV-2024-001',
    finalStatus: 'dispatched',
    createdAt: '2024-01-16T08:00:00'
  },
  {
    id: 'LS-2024-002',
    loadingSlipNo: 'LS-002',
    date: '2024-01-16',
    vehicleNo: 'MH-01-CD-5678',
    gatePassNo: 'GP-002',
    orders: [
      {
        orderId: 'ORD-2024-004',
        customerName: 'Modern Glass Works',
        customerAddress: '321 Commerce St, City',
        customerPhone: '9876543213',
        orderBy: 'John Marketing',
        items: [
          {
            thickness: '6 mm',
            companyName: 'Guardian',
            item: 'GP Clear',
            size1: '2440',
            size2: '1830',
            pcsQuantity: 150,
            agreedRate: 55.00,
            cdStatus: 'Cash',
            difference: 0,
            paymentTerms: 'Cash on delivery',
            invoiceNo: '',
            rackLocation: 'B-08'
          }
        ]
      }
    ],
    status: 'loading',
    confirmedBy: 'Mike Dispatch',
    confirmedAt: '2024-01-16T10:30:00',
    invoiceNo: '',
    finalStatus: 'pending',
    createdAt: '2024-01-16T10:00:00'
  }
];

export const items = [
  { value: 'GP Clear', label: 'GP Clear' },
  { value: 'SGG Mirror', label: 'SGG Mirror' },
  { value: 'Toughened Glass', label: 'Toughened Glass' },
  { value: 'Laminated Glass', label: 'Laminated Glass' },
  { value: 'Float Glass', label: 'Float Glass' },
  { value: 'Tinted Glass', label: 'Tinted Glass' }
];

export const brands = [
  { value: 'Saint Gobain', label: 'Saint Gobain' },
  { value: 'Asahi', label: 'Asahi' },
  { value: 'Guardian', label: 'Guardian' },
  { value: 'Pilkington', label: 'Pilkington' },
  { value: 'Gold Plus', label: 'Gold Plus' }
];

export const thicknessOptions = [
  '3 mm', '4 mm', '5 mm', '6 mm', '8 mm', '10 mm', '12 mm'
];

export const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'approved', label: 'Approved', color: 'green' },
  { value: 'hold', label: 'Hold', color: 'orange' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
  { value: 'dispatched', label: 'Dispatched', color: 'blue' },
  { value: 'partial', label: 'Partially Delivered', color: 'purple' },
  { value: 'delivered', label: 'Fully Delivered', color: 'green' }
];

export const cdStatusOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'credit_15', label: 'Credit 15 days' },
  { value: 'credit_30', label: 'Credit 30 days' },
  { value: 'credit_45', label: 'Credit 45 days' },
  { value: 'credit_60', label: 'Credit 60 days' }
];

export const paymentTermsOptions = [
  { value: 'cash_on_delivery', label: 'Cash on Delivery' },
  { value: 'advance_payment', label: 'Advance Payment' },
  { value: 'net_15', label: 'Net 15' },
  { value: 'net_30', label: 'Net 30' },
  { value: 'net_45', label: 'Net 45' },
  { value: 'net_60', label: 'Net 60' }
];

export const roles = [
  { value: 'admin', label: 'Admin', color: 'purple' },
  { value: 'marketing', label: 'Marketing Executive', color: 'blue' },
  { value: 'finance', label: 'Finance (Approval)', color: 'green' },
  { value: 'dispatch', label: 'Dispatch/Warehouse', color: 'orange' },
  { value: 'backoffice', label: 'Back Office', color: 'indigo' }
];



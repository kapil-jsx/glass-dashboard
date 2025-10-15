# Order Management Dashboard

A comprehensive role-based order management system built with Next.js, featuring role-based authentication, order tracking, approval workflows, loading slip management, and back-office operations.

## 🌟 Features

### 1. Marketing Executive (Order Entry)
- ✅ Create and record new customer orders
- ✅ Auto-generate Order ID for each entry
- ✅ Add complete order details (Date, Executive Name, Customer Name, Thickness, Item Name, Brand, Size, Quantity, Rate, Amount)
- ✅ Save and manage orders
- ✅ View order history with status tracking
- ✅ Edit or cancel draft orders before approval
- ✅ Add special instructions or remarks

### 2. Approving Authority (Finance)
- ✅ View all pending orders awaiting approval
- ✅ Verify payment dues, stock availability, and rate accuracy
- ✅ Approve, Hold, or Cancel orders with remarks
- ✅ Automatic status update after each action
- ✅ Track approved, held, and cancelled orders
- ✅ Dashboard with statistics

### 3. Dispatch / Warehouse Team
- ✅ View all approved orders ready for loading
- ✅ Create loading slips with multiple orders
- ✅ Group orders by route or vehicle
- ✅ Generate Loading Slip with all required fields:
  - Loading Slip No., Date, Vehicle No., Gate Pass No.
  - Customer Name & Details, Order By (Executive)
  - Thickness, Company Name, Item, Size, Quantity
  - Agreed Rate, CD Status, Payment Terms
  - Invoice No., Rack Location
- ✅ Edit slips during loading
- ✅ Confirm loaded orders
- ✅ Print loading slips

### 4. Back Office
- ✅ View confirmed loading slips
- ✅ Enter Invoice No. (linked with external Tally)
- ✅ Enter Gate Pass No. once generated
- ✅ Update final status: Dispatched / Left Factory
- ✅ Track partially delivered or returned items
- ✅ Print slips

### 5. Admin
- ✅ Full control over users and system settings
- ✅ Add/edit/delete users and assign roles
- ✅ View all orders at every stage
- ✅ Comprehensive dashboard with statistics
- ✅ Export reports (Excel/PDF ready)
- ✅ User management with role assignment

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Context API
- **Date Formatting**: date-fns
- **Authentication**: JWT-based (simulated with localStorage)

## 📦 Installation

1. **Clone the repository**
```bash
cd /home/dqot-65/Desktop/Kapil\ Work/Dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Default Login Credentials

### Admin
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full system access

### Marketing Executive
- **Username**: `marketing1`
- **Password**: `marketing123`
- **Access**: Order creation and management

### Finance (Approval)
- **Username**: `finance1`
- **Password**: `finance123`
- **Access**: Order approval and verification

### Dispatch/Warehouse
- **Username**: `dispatch1`
- **Password**: `dispatch123`
- **Access**: Loading slip creation

### Back Office
- **Username**: `backoffice1`
- **Password**: `backoffice123`
- **Access**: Final verification and dispatch

## 📁 Project Structure

```
Dashboard/
├── components/           # Reusable components
│   ├── Layout.js        # Main layout wrapper
│   ├── Sidebar.js       # Navigation sidebar
│   └── Header.js        # Top header bar
├── context/             # React Context providers
│   ├── AuthContext.js   # Authentication state
│   └── DataContext.js   # Application data state
├── data/                # Static data
│   └── staticData.js    # Mock data for orders, users, etc.
├── pages/               # Next.js pages
│   ├── _app.js         # App wrapper
│   ├── index.js        # Home/redirect
│   ├── login.js        # Login page
│   ├── dashboard.js    # Main dashboard
│   ├── orders.js       # Order management
│   ├── approvals.js    # Approval workflow
│   ├── loading-slips.js # Loading slip management
│   ├── back-office.js  # Back office operations
│   ├── users.js        # User management (Admin)
│   └── reports.js      # Reports and analytics
├── styles/              # Global styles
│   └── globals.css     # Tailwind CSS imports
├── utils/               # Utility functions
│   └── format.js       # Formatting helpers
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md           # This file
```

## 🎨 Features by Role

### Marketing Executive
- Create new orders with multiple line items
- Auto-generate order IDs
- Add customer details and special instructions
- View all orders with status tracking
- Edit pending orders
- Cancel draft orders

### Finance (Approval)
- View pending orders
- Review order details and customer information
- Approve, Hold, or Cancel orders
- Add remarks and reasons
- Track approval statistics

### Dispatch/Warehouse
- View approved orders
- Create loading slips
- Select multiple orders for a single slip
- Add vehicle and gate pass details
- Print loading slips
- Track loading status

### Back Office
- View confirmed loading slips
- Enter invoice numbers
- Enter gate pass numbers
- Update dispatch status
- Print final slips

### Admin
- User management (Create, Edit, Delete)
- Role assignment
- View all orders across all stages
- Comprehensive dashboard
- Export reports
- System statistics

## 🎯 Key Features

### Order Management
- ✅ Multi-line item support
- ✅ Auto-calculation of amounts
- ✅ Status tracking (Pending, Approved, Hold, Cancelled, Dispatched)
- ✅ Customer information management
- ✅ Remarks and special instructions

### Approval Workflow
- ✅ Status-based filtering
- ✅ Bulk approval actions
- ✅ Remarks and notes
- ✅ Audit trail (who approved and when)

### Loading Slip Management
- ✅ Multi-order consolidation
- ✅ Vehicle and gate pass tracking
- ✅ Print-ready format
- ✅ Status updates

### User Management
- ✅ Role-based access control
- ✅ User creation and editing
- ✅ Status management (Active/Inactive)
- ✅ Password management

### Reports & Analytics
- ✅ Order statistics
- ✅ Revenue tracking
- ✅ Status breakdown
- ✅ Loading slip reports
- ✅ Export functionality (ready for implementation)

## 🔒 Security Features

- Role-based authentication
- Protected routes
- Session management with localStorage
- Role-based UI rendering
- Secure password handling

## 📊 Dashboard Statistics

Each role sees relevant statistics:
- Total orders
- Pending approvals
- Approved orders
- On-hold orders
- Cancelled orders
- Total revenue
- Loading slips
- Dispatch status

## 🎨 UI/UX Features

- Modern, clean interface
- Responsive design
- Color-coded status badges
- Intuitive navigation
- Quick actions
- Modal dialogs for detailed views
- Print-ready layouts
- Loading states
- Error handling

## 🚀 Future Enhancements

- [ ] Database integration (PostgreSQL/MySQL)
- [ ] Real-time notifications
- [ ] Email notifications
- [ ] PDF export functionality
- [ ] Excel export functionality
- [ ] Advanced search and filters
- [ ] Date range filtering
- [ ] Customer management module
- [ ] Inventory management
- [ ] Payment tracking
- [ ] Mobile app

## 📝 Notes

- This is a frontend-only implementation with static data
- Data is stored in browser localStorage
- All data is lost on page refresh (by design for demo)
- For production, integrate with a backend API
- Authentication is simulated with localStorage

## 🤝 Contributing

This is a demo project. For production use:
1. Integrate with a backend API
2. Implement proper authentication (JWT, OAuth)
3. Add database persistence
4. Implement proper error handling
5. Add unit and integration tests
6. Add logging and monitoring

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Author

Order Management Dashboard - Built with Next.js

---

**Note**: This is a complete frontend implementation with static data. For production deployment, integrate with a backend API and database.

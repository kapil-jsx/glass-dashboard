# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Login Credentials

### Admin Access (Full Control)
```
Username: admin
Password: admin123
```

### Marketing Executive (Order Entry)
```
Username: marketing1
Password: marketing123
```

### Finance (Approval)
```
Username: finance1
Password: finance123
```

### Dispatch/Warehouse
```
Username: dispatch1
Password: dispatch123
```

### Back Office
```
Username: backoffice1
Password: backoffice123
```

---

## 📋 Quick Workflow

### 1. Marketing Executive Creates Order
1. Login as `marketing1`
2. Go to "Orders" page
3. Click "Create Order"
4. Fill in customer details
5. Add items (thickness, item name, brand, size, quantity, rate)
6. Add remarks if needed
7. Click "Create Order"

### 2. Finance Approves Order
1. Login as `finance1`
2. Go to "Approvals" page
3. View pending orders
4. Click on an order to review
5. Click "Approve Order" or "Hold Order" or "Cancel Order"
6. Add remarks if needed

### 3. Dispatch Creates Loading Slip
1. Login as `dispatch1`
2. Go to "Loading Slips" page
3. Click "Create Loading Slip"
4. Select approved orders
5. Add vehicle number
6. Click "Create Loading Slip"
7. Print the loading slip

### 4. Back Office Updates Dispatch
1. Login as `backoffice1`
2. Go to "Back Office" page
3. View confirmed loading slips
4. Click "Edit" on a loading slip
5. Enter Invoice No. and Gate Pass No.
6. Update status to "Dispatched"
7. Click "Update"

### 5. Admin Manages Users
1. Login as `admin`
2. Go to "Users" page
3. Click "Add User" to create new users
4. Edit or delete existing users
5. Assign roles to users

---

## 🎯 Key Features to Try

### Order Management
- ✅ Create orders with multiple items
- ✅ View order history
- ✅ Edit pending orders
- ✅ Cancel draft orders

### Approval Workflow
- ✅ Approve orders
- ✅ Hold orders with reasons
- ✅ Cancel orders
- ✅ Add remarks

### Loading Slips
- ✅ Create loading slips
- ✅ Group multiple orders
- ✅ Print loading slips
- ✅ Track dispatch status

### Back Office
- ✅ Update invoice numbers
- ✅ Update gate pass numbers
- ✅ Mark as dispatched
- ✅ Print final slips

### Admin Dashboard
- ✅ View all orders
- ✅ Manage users
- ✅ View statistics
- ✅ Export reports

---

## 💡 Tips

1. **Data Persistence**: Data is stored in browser localStorage. Refresh the page to see changes persist.

2. **Role-Based Access**: Each role sees different menu items and has different permissions.

3. **Status Flow**: 
   - Pending → Approved → Loading Slip → Dispatched
   - Orders can be Held or Cancelled at any approval stage

4. **Order Items**: You can add multiple items to a single order. Each item has its own thickness, size, quantity, and rate.

5. **Loading Slips**: You can group multiple approved orders into a single loading slip for efficient dispatch.

6. **Print Functionality**: Use the print button to print loading slips and reports.

---

## 🐛 Troubleshooting

### Issue: Page not loading
**Solution**: Make sure you're running `npm run dev` and the server is started on port 3000.

### Issue: Login not working
**Solution**: Check that you're using the correct credentials from the list above.

### Issue: Data not persisting
**Solution**: This is expected behavior. Data is stored in localStorage and persists across page refreshes but not across different browsers.

### Issue: Can't see certain pages
**Solution**: Some pages are only visible to specific roles. Make sure you're logged in with the correct role.

---

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color-Coded Status**: Easy to identify order status
- **Modal Dialogs**: Detailed views without leaving the page
- **Quick Actions**: Edit, delete, view buttons for quick access
- **Search & Filter**: Find orders quickly
- **Statistics Dashboard**: See key metrics at a glance

---

## 🔄 Typical Workflow

```
Marketing Executive → Creates Order
         ↓
Finance → Reviews & Approves Order
         ↓
Dispatch → Creates Loading Slip
         ↓
Back Office → Updates Invoice & Gate Pass
         ↓
Order Dispatched ✓
```

---

## 📊 Dashboard Overview

Each role sees relevant statistics:
- **Marketing**: Orders created, pending approvals
- **Finance**: Pending approvals, approved orders
- **Dispatch**: Approved orders, loading slips created
- **Back Office**: Confirmed slips, dispatched orders
- **Admin**: All statistics across all roles

---

## 🎓 Learning Path

1. Start with Marketing Executive role
2. Create a few test orders
3. Switch to Finance role and approve them
4. Switch to Dispatch role and create loading slips
5. Switch to Back Office and update dispatch status
6. Finally, login as Admin to see the complete picture

---

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Check browser console for any errors

---

**Enjoy using the Order Management Dashboard! 🎉**



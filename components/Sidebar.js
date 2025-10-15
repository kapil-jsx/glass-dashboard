import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiShoppingCart, FiCheckCircle, FiTruck, FiFileText, FiUsers, FiLogOut, FiBarChart3 } from 'react-icons/fi';

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: FiHome,
      path: '/dashboard',
      roles: ['admin', 'marketing', 'finance', 'dispatch', 'backoffice']
    },
    {
      name: 'Orders',
      icon: FiShoppingCart,
      path: '/orders',
      roles: ['admin', 'marketing']
    },
    {
      name: 'Approvals',
      icon: FiCheckCircle,
      path: '/approvals',
      roles: ['admin', 'finance']
    },
    {
      name: 'Loading Slips',
      icon: FiTruck,
      path: '/loading-slips',
      roles: ['admin', 'dispatch']
    },
    {
      name: 'Back Office',
      icon: FiFileText,
      path: '/back-office',
      roles: ['admin', 'backoffice']
    },
    {
      name: 'Users',
      icon: FiUsers,
      path: '/users',
      roles: ['admin']
    },
    {
      name: 'Reports',
      icon: FiBarChart3,
      path: '/reports',
      roles: ['admin']
    }
  ];

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  const isActive = (path) => {
    if (path === '/dashboard') {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-bold">Order Management</h1>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.path);
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {Icon && <Icon className="mr-3 h-5 w-5" />}
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

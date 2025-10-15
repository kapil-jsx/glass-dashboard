import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // Role credentials mapping
  const roleCredentials = {
    admin: { username: 'admin', password: 'admin123' },
    marketing: { username: 'marketing1', password: 'marketing123' },
    finance: { username: 'finance1', password: 'finance123' },
    dispatch: { username: 'dispatch1', password: 'dispatch123' },
    backoffice: { username: 'backoffice1', password: 'backoffice123' }
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Update credentials when role changes
  useEffect(() => {
    const creds = roleCredentials[selectedRole];
    setUsername(creds.username);
    setPassword(creds.password);
  }, [selectedRole, roleCredentials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(username, password);

    if (result.success) {
      // Redirect based on role
      const roleRoutes = {
        admin: '/dashboard',
        marketing: '/orders',
        finance: '/approvals',
        dispatch: '/loading-slips',
        backoffice: '/back-office'
      };
      router.push(roleRoutes[result.user.role] || '/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-10 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLogIn className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">Order Management</h1>
            <p className="text-primary-100 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'admin', label: 'Admin', color: 'purple' },
                    { value: 'marketing', label: 'Marketing', color: 'blue' },
                    { value: 'finance', label: 'Finance', color: 'green' },
                    { value: 'dispatch', label: 'Dispatch', color: 'orange' },
                    { value: 'backoffice', label: 'Back Office', color: 'indigo' }
                  ].map((role) => (
                    <label
                      key={role.value}
                      className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedRole === role.value
                          ? `border-${role.color}-500 bg-${role.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={selectedRole === role.value}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center w-4 h-4 rounded-full border-2 mr-2 ${
                        selectedRole === role.value
                          ? `border-${role.color}-500`
                          : 'border-gray-300'
                      }`}>
                        {selectedRole === role.value && (
                          <div className={`w-2 h-2 rounded-full bg-${role.color}-500`}></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        selectedRole === role.value
                          ? `text-${role.color}-700`
                          : 'text-gray-700'
                      }`}>
                        {role.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="px-8 pb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 mb-1">
                💡 Tip: Select a role above to auto-fill credentials
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6">
          © 2024 Order Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}



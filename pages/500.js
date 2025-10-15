import { useRouter } from 'next/router';
import { FiHome, FiRefreshCw } from 'react-icons/fi';

export default function Custom500() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-red-600">500</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Server Error</h1>
          <p className="text-gray-600">
            Something went wrong on our end. Please try again later.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <FiHome className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </button>
          <button
            onClick={() => router.reload()}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <FiRefreshCw className="w-5 h-5" />
            <span>Refresh Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}



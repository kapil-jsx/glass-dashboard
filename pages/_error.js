import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiAlertCircle, FiHome, FiRefreshCw } from 'react-icons/fi';

function Error({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    // Log error for debugging
    console.error('Error page rendered with status:', statusCode);
  }, [statusCode]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {statusCode ? statusCode : 'Error'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {statusCode === 404 ? 'Page Not Found' : 'Something went wrong'}
          </h2>
          <p className="text-gray-600">
            {statusCode === 404
              ? 'The page you are looking for does not exist.'
              : 'An error occurred while processing your request.'}
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
            onClick={() => router.back()}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <FiRefreshCw className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;


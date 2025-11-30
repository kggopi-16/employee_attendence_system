import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-indigo-600">404</h1>
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Page not found
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="text-center p-8  rounded-xl shadow-lg max-w-lg w-full">
        <div className="text-red-500 mb-4">
          {/* Lock icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.5 1.5 0 0118.75 12v7.5a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold 0">Access Denied</h1>
        <p className=" mt-2">You are not authorized to view this page.</p>

        <Link to="/">
          <Button className="hover:cursor-pointer">Go Home</Button>
        </Link>
      </Card>
    </div>
  );
};

export default Unauthorized;

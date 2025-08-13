import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen  text-center p-6 text-primary">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold  mt-4">Page Not Found</h2>
      <p className=" mt-2 mb-7">The page you’re looking for doesn’t exist or has been moved.</p>

      <Link to="/">
        <Button className="hover:cursor-pointer ">Go Home</Button>
      </Link>
    </section>
  );
}

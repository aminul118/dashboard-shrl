import { Skeleton } from '@/components/ui/skeleton';

const PrivateRouteSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-muted p-4 border-r hidden md:flex flex-col gap-4">
        <Skeleton className="h-10 w-32 mb-6" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-5/6" />
        <Skeleton className="h-8 w-2/3" />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-20" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Skeleton className="h-10 w-1/4 mb-6" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl col-span-1 md:col-span-2" />
        </main>
      </div>
    </div>
  );
};

export default PrivateRouteSkeleton;

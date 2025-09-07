import { Skeleton } from '@/components/ui/skeleton';

const HomePageSkeleton = () => {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="shadow-md rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          >
            <Skeleton className="h-24 w-48 mb-4" /> {/* Title */}
            <Skeleton className="h-10 w-24" /> {/* Value */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePageSkeleton;

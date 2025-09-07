/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { useGetAdminStatsQuery } from '@/redux/features/stats/stats.api';

const Home = () => {
  const { data, isLoading } = useGetAdminStatsQuery(undefined);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.map((stats: any, idx: number) => {
          return (
            <Card
              key={idx}
              className="shadow-md rounded-2xl hover:shadow-xl transition-all duration-200"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <h1 className="text-lg font-semibold">{stats?.name}</h1>
                <p className="mt-2 text-3xl font-bold text-blue-600">{stats?.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Home;

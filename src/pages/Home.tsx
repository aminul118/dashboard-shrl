import { Card } from '@/components/ui/card';
import { TypographyH3 } from '@/components/ui/typography';
import { useGetAdminStatsQuery } from '@/redux/features/stats/stats.api';
import { navMenu } from '@/routes/adminSidebarItem';
import generateRoutes from '@/utils/generateRoutes';

interface IState {
  name: string;
  value: string;
}

const Home = () => {
  generateRoutes(navMenu);

  const { data, isLoading } = useGetAdminStatsQuery(undefined);
  if (isLoading) {
    return <p>Loading..</p>;
  }

  const stats = data?.data;
  // console.log(stats);

  return (
    <section>
      <TypographyH3 title="Welcome Admin" className="mb-12 text-center text-5xl" />
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-6 container mx-auto">
        {stats.map((stat: IState, i: number) => {
          return (
            <Card key={i} className="text-center bg-primary">
              <p className="text-3xl font-bold text-white">{stat.name}</p>
              <p className="text-2xl">{stat.value}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Home;

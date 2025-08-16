/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GradientTitle from '@/components/ui/gradientTitle';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { useGetAdminStatsQuery } from '@/redux/features/stats/stats.api';
import { navMenu } from '@/routes/adminSidebarItem';
import generateRoutes from '@/utils/generateRoutes';
// Types RTK Query commonly uses for errors
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

// Helper to extract a readable message from RTK Query error shapes
function getErrorMessage(error: unknown): string {
  const fallback = 'Something went wrong. Please try again.';
  if (!error) return fallback;

  const e = error as FetchBaseQueryError | SerializedError | any;

  // fetchBaseQuery network / server errors
  if (typeof e.status !== 'undefined') {
    // e.data may be string or object with message
    const dataMsg =
      typeof (e as any).data === 'string'
        ? (e as any).data
        : (e as any).data?.message || (e as any).error;
    return dataMsg || `Request failed (${String(e.status)}).`;
  }

  // SerializedError (thrown in lifecycle)
  if ('message' in e && typeof e.message === 'string' && e.message) {
    return e.message;
  }

  return fallback;
}

interface IState {
  name: string;
  value: string | number;
}

const Home = () => {
  // Run route generation once on mount
  useEffect(() => {
    generateRoutes(navMenu);
  }, []);

  // Stats query
  const {
    data: statsResp,
    isLoading: statsLoading,
    isFetching: statsFetching,
    isError: statsIsError,
    error: statsError,
    refetch: refetchStats,
  } = useGetAdminStatsQuery(undefined);

  // User query
  const {
    data: userResp,
    isLoading: userLoading,
    isFetching: userFetching,
    isError: userIsError,
    error: userError,
    refetch: refetchUser,
  } = useUserInfoQuery(undefined);

  // Derived data with strong guards
  const stats: IState[] = useMemo(() => {
    const maybe = (statsResp as any)?.data;
    return Array.isArray(maybe) ? maybe : [];
  }, [statsResp]);

  const userName =
    (userResp as any)?.data?.name ??
    (userResp as any)?.name ?? // just in case your shape is flat
    'there';

  const anyLoading = statsLoading || userLoading;
  const anyFetching = statsFetching || userFetching;
  const anyError = statsIsError || userIsError;

  // 1) Initial loading state
  if (anyLoading) {
    return (
      <section className="container mx-auto space-y-6">
        <GradientTitle title={`Welcome …`} />
        {/* Simple skeletons; replace with your Skeleton component if you have one */}
        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-8 w-24 rounded bg-muted mb-3" />
              <div className="h-5 w-32 rounded bg-muted" />
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Loading dashboard…</p>
      </section>
    );
  }

  // 2) Error states
  if (anyError && stats.length === 0) {
    // If both failed, show combined; else show the one that failed and keep a retry for both
    const messageLines: string[] = [];
    if (userIsError) messageLines.push(`User: ${getErrorMessage(userError)}`);
    if (statsIsError) messageLines.push(`Stats: ${getErrorMessage(statsError)}`);

    return (
      <section className="container mx-auto space-y-4">
        <GradientTitle title={`Welcome there`} />
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <h3 className="font-semibold text-destructive">Couldn’t load the dashboard</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-destructive">
            {messageLines.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => refetchUser()}>Retry User</Button>
            <Button onClick={() => refetchStats()}>Retry Stats</Button>
          </div>
        </div>
      </section>
    );
  }

  // 3) Partial success warnings (e.g., user ok, stats failed, or vice versa)
  const partialWarnings: string[] = [];
  if (userIsError) partialWarnings.push(`User: ${getErrorMessage(userError)}`);
  if (statsIsError) partialWarnings.push(`Stats: ${getErrorMessage(statsError)}`);

  // 4) Empty state (no stats)
  const isEmpty = stats.length === 0;

  return (
    <section className="container mx-auto space-y-6">
      <GradientTitle title={`Welcome ${userName}`} />

      {anyFetching && <p className="text-xs text-muted-foreground">Updating data…</p>}

      {partialWarnings.length > 0 && (
        <div className="rounded-lg border border-yellow-400/40 bg-yellow-500/10 p-3 text-sm text-yellow-700">
          <p className="font-medium mb-1">Some parts didn’t load:</p>
          <ul className="list-disc pl-5">
            {partialWarnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2">
            {userIsError && (
              <Button size="sm" onClick={() => refetchUser()}>
                Retry User
              </Button>
            )}
            {statsIsError && (
              <Button size="sm" onClick={() => refetchStats()}>
                Retry Stats
              </Button>
            )}
          </div>
        </div>
      )}

      {isEmpty ? (
        <Card className="p-6 text-center">
          <p className="text-lg font-semibold">No stats to display</p>
          <p className="text-sm text-muted-foreground mt-1">
            Once activity starts coming in, your KPIs will appear here.
          </p>
          <div className="mt-3">
            <Button onClick={() => refetchStats()}>Refresh</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const key = stat?.name ?? `stat-${i}`;
            const value =
              typeof stat?.value === 'number' || typeof stat?.value === 'string'
                ? stat.value
                : '--';
            const name = stat?.name ?? 'Unnamed metric';

            return (
              <Card key={key} className="text-center p-6">
                <p className="text-4xl font-bold">{value}</p>
                <p className="font-bold text-white">{name}</p>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Home;

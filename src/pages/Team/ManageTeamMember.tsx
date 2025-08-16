// components/modules/team/ManageTeamMember.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from 'react';
import DeleteConfirmation from '@/components/modules/common/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import GradientTitle from '@/components/ui/gradientTitle';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  useDeleteTeamMemberMutation,
  useGetAllTeamMembersQuery,
} from '@/redux/features/team/team.api';
import { Trash2, RefreshCw } from 'lucide-react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type TeamMember = {
  _id: string;
  slug: string;
  name: string;
  phone?: string;
  photo?: string;
  email?: string;
  shrlDesignation?: string;
};

const COLS = 6;

function getErrorMessage(error: unknown): string {
  const fallback = 'Something went wrong. Please try again.';
  if (!error) return fallback;

  const e = error as FetchBaseQueryError | SerializedError | any;

  if (typeof (e as any)?.status !== 'undefined') {
    const status = (e as any).status;
    const data = (e as any).data;
    const msg = typeof data === 'string' ? data : data?.message || data?.error || data?.detail;
    return msg || `Request failed (${String(status)}).`;
  }

  if (typeof (e as any)?.message === 'string' && (e as any).message) {
    return (e as any).message;
  }

  return fallback;
}

const ManageTeamMember = () => {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetAllTeamMembersQuery(undefined);

  const [deleteTeamMember] = useDeleteTeamMemberMutation();
  const imgFallbackRef = useRef(new Set<string>());

  // Normalize data shape: accept array OR { data: array }
  const rows: TeamMember[] = useMemo(() => {
    if (Array.isArray(data)) return data as TeamMember[];
    const maybe = (data as any)?.data;
    return Array.isArray(maybe) ? (maybe as TeamMember[]) : [];
  }, [data]);

  const handleDelete = async (slug: string) => {
    return await deleteTeamMember(slug).unwrap();
  };

  const renderSkeleton = (count = 5) => (
    <TableBody>
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={`sk-${i}`} className="animate-pulse">
          {Array.from({ length: COLS }).map((__, j) => (
            <TableCell key={`skc-${i}-${j}`}>
              <div className="h-8 w-24 bg-muted rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <GradientTitle title="Team Members" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          {isFetching ? 'Refreshing…' : 'Refresh'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-primary">
            <TableHead>SI</TableHead>
            <TableHead className="w-[72px]">Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Loading state */}
        {isLoading && renderSkeleton(6)}

        {/* Error state */}
        {!isLoading && isError && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={COLS}>
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
                  <p className="text-sm text-destructive">{getErrorMessage(error)}</p>
                  <div className="mt-2">
                    <Button onClick={() => refetch()} size="sm">
                      Try again
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}

        {/* Data / Empty state */}
        {!isLoading && !isError && (
          <TableBody>
            {rows?.length ? (
              rows.map((team, i) => {
                const key = team._id ?? team.slug ?? team.email ?? `${team.name}-${i}`;

                return (
                  <TableRow key={key}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      {/* resilient img with fallback */}
                      <img
                        src={
                          team.photo && !imgFallbackRef.current.has(team.photo)
                            ? team.photo
                            : '/placeholder-avatar.png'
                        }
                        onError={(e) => {
                          const bad = e.currentTarget.getAttribute('src') || '';
                          if (bad) imgFallbackRef.current.add(bad);
                          e.currentTarget.src = '/placeholder-avatar.png';
                        }}
                        alt={team.name || 'Member photo'}
                        className="h-12 w-12 rounded-full object-cover border"
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.shrlDesignation || '-'}</TableCell>
                    <TableCell>{team.phone || '-'}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <DeleteConfirmation onConfirm={() => handleDelete(team.slug)}>
                        <Button
                          variant="destructive"
                          size="icon"
                          aria-label={`Delete ${team.name}`}
                          title={`Delete ${team.name}`}
                        >
                          <Trash2 />
                        </Button>
                      </DeleteConfirmation>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={COLS} className="text-center text-sm text-muted-foreground">
                  {isFetching ? 'Loading…' : 'No team members found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ManageTeamMember;

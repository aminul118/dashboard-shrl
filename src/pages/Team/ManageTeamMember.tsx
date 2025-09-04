// components/modules/team/ManageTeamMember.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from 'react';
import DeleteConfirmation from '@/components/modules/actions/DeleteConfirmation';
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
import { Trash2 } from 'lucide-react';
import ManageTeamMemberSkeleton from './ManageTeamMemberSkeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Link } from 'react-router';

interface TeamMember {
  _id: string;
  slug: string;
  name: string;
  phone?: string;
  photo?: string;
  email?: string;
  shrlDesignation?: string;
}

const ManageTeamMember = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching, isError } = useGetAllTeamMembersQuery({
    page: currentPage,
    limit,
  });
  const meta = data?.meta;

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

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <GradientTitle title="Team Members" />
        <Button>
          <Link to="/add-team-member">Add Team Member</Link>
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
        {isLoading && <ManageTeamMemberSkeleton count={6} />}

        {/* Data / Empty state */}
        {!isLoading && !isError && (
          <TableBody>
            {rows?.length ? (
              rows.map((team, i) => {
                const key = team._id ?? team.slug ?? team.email ?? `${team.name}-${i}`;

                return (
                  <>
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
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {isFetching ? 'Loading…' : 'No team members found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>

      {/* Pagination */}
      {meta?.totalPage > 1 && (
        <Pagination className="mt-4 flex justify-end">
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: meta.totalPage }, (_, index) => index + 1).map((page) => (
              <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                <PaginationLink isActive={currentPage === page} className="cursor-pointer">
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(meta.totalPage, prev + 1))}
                className={
                  currentPage === meta.totalPage
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ManageTeamMember;

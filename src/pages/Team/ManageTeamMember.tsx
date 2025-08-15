// components/modules/team/ManageTeamMember.tsx
import DeleteConfirmation from '@/components/modules/common/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import GradientTitle from '@/components/ui/gradientTitle';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell, // 👈 you forgot to import this
} from '@/components/ui/table';
import {
  useDeleteTeamMemberMutation,
  useGetAllTeamMembersQuery,
} from '@/redux/features/team/team.api';
import { Trash2 } from 'lucide-react';

type TeamMember = {
  _id: string;
  slug: string;
  name: string;
  phone?: string;
  photo?: string;
  email?: string;
  shrlDesignation?: string;
};

const ManageTeamMember = () => {
  const { data, isLoading } = useGetAllTeamMembersQuery(undefined);
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  const rows: TeamMember[] = Array.isArray(data) ? data : (data?.data ?? []);

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading team members…</div>;
  }

  const handleDelete = async (slug: string) => {
    return await deleteTeamMember(slug).unwrap();
  };

  return (
    <div className="container mx-auto">
      <GradientTitle title="Team Members" />
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

        <TableBody>
          {rows?.length ? (
            rows.map((team, i) => (
              <TableRow key={team._id ?? team.slug ?? team.email ?? team.name}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <img
                    src={team.photo || '/placeholder-avatar.png'}
                    alt={team.name}
                    className="h-12 w-12 rounded-full object-cover border"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.shrlDesignation}</TableCell>
                <TableCell>{team.phone || '-'}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <DeleteConfirmation onConfirm={() => handleDelete(team.slug)}>
                    <Button>
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                No team members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageTeamMember;

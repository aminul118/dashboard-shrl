import {
  useDeleteJoinRequestMutation,
  useTeamJoinRequestQuery,
} from '@/redux/features/team/team.api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import GradientTitle from '@/components/ui/gradientTitle';
import { ShowRequestModal } from '@/pages/Team/ShowRequestModal';
import { TeamJoinSendMessage } from '@/pages/Team/TeamJoinSendMessage';
import DeleteConfirmation from '@/components/modules/actions/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import dateFormat from '@/utils/dateFormat';

export interface IRequestJoin {
  name: string;
  email: string;
  phone: string;
  gender: string;
  occupation: string;
  organization: string;
  field_of_interest: string;
  Why_join_team: string;
  time_commitment: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const TeamJoinRequest = () => {
  const { data, isLoading } = useTeamJoinRequestQuery(undefined);
  const [deleteJoinRequest] = useDeleteJoinRequestMutation();

  const requests = data?.data || [];

  const handleDelete = async (id: string) => {
    return await deleteJoinRequest(id).unwrap();
  };

  if (!isLoading) {
    return (
      <div className="container mx-auto overflow-x-auto">
        <GradientTitle title="Team Join Request" />
        <Table>
          <TableHeader className="bg-amber-700">
            <TableRow>
              <TableHead>SI</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Request Date & Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((req: IRequestJoin, i: number) => (
              <TableRow key={req._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{req.name}</TableCell>
                <TableCell>{req.email}</TableCell>
                <TableCell>{req.phone}</TableCell>
                <TableCell>{req.occupation}</TableCell>
                <TableCell>{dateFormat(req.createdAt)}</TableCell>
                {/* Table Actions */}
                <TableCell className="flex items-center gap-2">
                  <ShowRequestModal payload={req} />
                  <TeamJoinSendMessage email={req.email} />
                  <DeleteConfirmation onConfirm={() => handleDelete(req._id)}>
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default TeamJoinRequest;

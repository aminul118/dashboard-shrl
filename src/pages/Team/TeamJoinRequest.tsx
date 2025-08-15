import { useTeamJoinRequestQuery } from '@/redux/features/team/team.api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import GradientTitle from '@/components/ui/gradientTitle';
import { ShowRequestModal } from '@/components/modules/teamJoinReguest/ShowRequestModal';
import { TeamJoinSendMessage } from '@/components/modules/teamJoinReguest/TeamJoinSendMessage';

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

  if (isLoading) {
    return <p>Loading..</p>;
  }

  const requests = data?.data || [];

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
            <TableHead>Created At</TableHead>
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
              <TableCell>{new Date(req.createdAt).toLocaleString()}</TableCell>
              <TableCell className="flex items-center gap-2">
                <ShowRequestModal payload={req} />
                <TeamJoinSendMessage email={req.email} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamJoinRequest;

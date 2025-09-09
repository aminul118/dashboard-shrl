import { useAllUsersInfoQuery } from '@/redux/features/auth/auth.api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import dateFormat from '@/utils/dateFormat';
import GradientTitle from '@/components/ui/gradientTitle';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'USER';
  picture?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  createdAt: string;
}

const Users = () => {
  const { data, isLoading } = useAllUsersInfoQuery(undefined);

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <div className="container mx-auto overflow-x-auto">
      <GradientTitle title="Registered Users" />

      <Table>
        <TableHeader className="bg-primary text-white">
          <TableRow>
            <TableHead>SI</TableHead>
            <TableHead>Picture</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verify</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((user: IUser, index: number) => (
            <TableRow key={user._id} className="hover:bg-primary/10">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="font-medium">{user.role}</TableCell>
              <TableCell>
                {user.isVerified ? (
                  <Badge className="bg-green-800 text-white">
                    <BadgeCheck /> Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">Unverified</Badge>
                )}
              </TableCell>
              <TableCell>{dateFormat(user.createdAt)}</TableCell>
              <TableCell className="text-center">
                <Button variant="destructive" size="icon">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;

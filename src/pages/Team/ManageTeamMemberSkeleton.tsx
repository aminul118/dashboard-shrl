import { TableBody, TableCell, TableRow } from '@/components/ui/table';

const COLS = 6;
const ManageTeamMemberSkeleton = ({ count }: { count: number }) => (
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

export default ManageTeamMemberSkeleton;

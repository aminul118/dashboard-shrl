import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="container mx-auto overflow-x-auto">
      <Table>
        <TableHeader className="bg-primary text-white">
          <TableRow>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-6" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;

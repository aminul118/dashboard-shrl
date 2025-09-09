import DeleteConfirmation from '@/components/modules/actions/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import GradientTitle from '@/components/ui/gradientTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useDeleteScrollingTextMutation,
  useGetScrollingTextQuery,
} from '@/redux/features/scrollingText/scrollingText.api';
import { Trash2 } from 'lucide-react';
import AddScrollingTextModal from './AddScrollingTextModal';
import dateFormat from '@/utils/dateFormat';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
interface IText {
  _id: string;
  text: string;
  createdAt: string;
}

const ScrollingText = () => {
  const { data: scrollingText, isLoading } = useGetScrollingTextQuery(undefined);

  const [deleteScrollingText, { isLoading: isDeleting }] = useDeleteScrollingTextMutation();

  const handleDelete = async (id: string) => {
    return await deleteScrollingText(id).unwrap();
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-x-auto container mx-auto">
      <div className="flex justify-between items-center">
        <GradientTitle title="Manage Scrolling Text" />
        <AddScrollingTextModal />
      </div>

      {
        <Table>
          <TableHeader>
            <TableRow className="bg-primary">
              <TableHead className="w-16 text-center">SI</TableHead>
              <TableHead className="text-left">Text</TableHead>
              <TableHead className="text-left">Date & Time</TableHead>
              <TableHead className="w-32 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {scrollingText?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No scrolling text found.
                </TableCell>
              </TableRow>
            ) : (
              scrollingText?.data?.map((text: IText, i: number) => (
                <TableRow key={text._id} className="text-center hover:bg-muted/30 transition">
                  <TableCell className="text-center">{i + 1}</TableCell>
                  <TableCell className="text-left">
                    {text.text?.length > 80 ? text.text.slice(0, 80) + '...' : text.text}
                  </TableCell>
                  <TableCell className="text-left">{dateFormat(text.createdAt)}</TableCell>
                  <TableCell className="text-center">
                    <DeleteConfirmation onConfirm={() => handleDelete(text._id)}>
                      <Button variant="destructive" size="sm" disabled={isDeleting}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      }
    </div>
  );
};

export default ScrollingText;

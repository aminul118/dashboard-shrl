import {
  useDeleteAiTrainingDataMutation,
  useGetAiTrainingsQuery,
} from '@/redux/features/ai/ai.api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import GradientTitle from '@/components/ui/gradientTitle';
import AddAiTrainingsModal from './AddAiTrainingsModal';
import DeleteConfirmation from '@/components/modules/actions/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import dateFormat from '@/utils/dateFormat';

type AiTraining = {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
};

const AiTrainings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAiTrainingsQuery({ page: currentPage, limit });
  const [deleteAiData, { isLoading: isDeleting }] = useDeleteAiTrainingDataMutation();
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    return await deleteAiData(id).unwrap();
  };

  return (
    <section className="overflow-x-auto container mx-auto">
      <div className="flex justify-between items-center">
        <GradientTitle title="AI Training Data" />
        <AddAiTrainingsModal />
      </div>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead>SI</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Training Date & Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <p>Loading..</p>}
          {data?.data?.length === 0 ? (
            <>
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No Data Found
                </TableCell>
              </TableRow>
            </>
          ) : (
            <>
              {data?.data?.map((item: AiTraining, i: number) => (
                <TableRow key={item._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.answer}</TableCell>
                  <TableCell>{dateFormat(item.createdAt)}</TableCell>
                  <TableCell className="text-left">
                    <DeleteConfirmation onConfirm={() => handleDelete(item._id)}>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="hover:cursor-pointer"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
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
    </section>
  );
};

export default AiTrainings;

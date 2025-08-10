import { Button } from '@/components/ui/button';
import ButtonSpinner from '@/components/ui/button-spinner';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import {
  useDeleteScrollingTextMutation,
  useGetScrollingTextQuery,
} from '@/redux/features/scrollingText/scrollingText.api';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface IText {
  _id: string;
  text: string;
}

const ManageScrollingText = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: scrollingText, isLoading, isError } = useGetScrollingTextQuery(undefined);

  const [deleteScrollingText] = useDeleteScrollingTextMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {'Something went wrong'}</p>;

  const handleUpdate = (id: string) => {
    // TODO: Implement update logic (e.g. open modal or navigate to edit page)
    console.log('Update', id);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteScrollingText(id).unwrap();
      console.log(res);
      toast.success('Deleted successfully');
      // The data will auto-refresh due to RTK Query cache update
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete. Please try again.');
    }
  };

  if (scrollingText?.data?.length === 0) {
    return (
      <div className=" text-center">
        <TypographyH3 className="text-primary" title="No Data Found" />
        <TypographyP text="Please add scrolling text to show here" />
      </div>
    );
  }
  return (
    <div className="overflow-x-auto max-w-5xl w-full mx-auto">
      <TypographyH3 title="Manage Scrolling Text" className="mb-12 text-center" />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border px-4 py-2">SI</th>
            <th className="border px-4 py-2">Text</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scrollingText?.data?.map((text: IText, i: number) => (
            <tr key={text._id} className="text-center border-t">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2 text-left">{text.text}</td>
              <td className="border px-4 py-2 space-x-2">
                <Button onClick={() => handleUpdate(text._id)}>
                  <SquarePen />
                </Button>
                <Button onClick={() => handleDelete(text._id)} disabled={deletingId === text._id}>
                  {deletingId === text._id ? <ButtonSpinner /> : <Trash2 />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScrollingText;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteConfirmation from '@/components/modules/common/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import {
  useDeleteScrollingTextMutation,
  useGetScrollingTextQuery,
} from '@/redux/features/scrollingText/scrollingText.api';
import { SquarePen, Trash2 } from 'lucide-react';

interface IText {
  _id: string;
  text: string;
}

const ManageScrollingText = () => {
  const { data: scrollingText, isLoading, isError } = useGetScrollingTextQuery(undefined);

  const [deleteScrollingText] = useDeleteScrollingTextMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {'Something went wrong'}</p>;

  const handleUpdate = (id: string) => {
    // TODO: Implement update logic (e.g. open modal or navigate to edit page)
    console.log('Update', id);
  };

  const handleDelete = async (id: string) => {
    return await deleteScrollingText(id).unwrap();
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
                <DeleteConfirmation onConfirm={() => handleDelete(text._id)}>
                  <Button>
                    <Trash2 />
                  </Button>
                </DeleteConfirmation>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScrollingText;

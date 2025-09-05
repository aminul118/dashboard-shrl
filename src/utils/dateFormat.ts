import { format } from 'date-fns';

const dateFormat = (input: string) => {
  return format(new Date(input), 'dd MMM yyyy - hh:mm a');
};

export default dateFormat;

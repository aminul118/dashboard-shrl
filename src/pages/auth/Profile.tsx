import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';

const Profile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const user = data?.data;
  const avatarText = user?.name?.charAt(0) ?? '';

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="rounded-full text-2xl font-bold">
              {avatarText}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-xl font-semibold">{user?.name}</CardTitle>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
        </CardHeader>

        <CardContent className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome to your profile page. You can view and update your personal information here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

import type React from 'react';

interface IChildren {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IChildren) => {
  return <div>{children}</div>;
};

export default DashboardLayout;

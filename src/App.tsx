import { Outlet } from 'react-router';
import DashboardLayout from './components/layouts/DashboardLayout';

const App = () => {
  return (
    <>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

export default App;

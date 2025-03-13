import { Outlet } from 'react-router-dom';
import LSidebar from './LSidebar';
import Header from '../LibrarianAndAdmin/Header';

const LAppLayout = () => {
  return (
    <div className="flex h-screen">
      <LSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <div className="flex-1 overflow-auto p-4 la-content-bg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LAppLayout;
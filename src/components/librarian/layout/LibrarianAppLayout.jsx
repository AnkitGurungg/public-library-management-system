import { Outlet } from 'react-router-dom';
import LibrarianHeader from './LibrarianHeader';
import LibrarianSidebar from './LibrarianSidebar';

const LibrarianAppLayout = () => {
  return (
    <div className="flex h-screen">
      <LibrarianSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <LibrarianHeader />
        <div className="flex-1 overflow-auto p-4 la-content-bg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LibrarianAppLayout;
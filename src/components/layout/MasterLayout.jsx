import { Outlet } from 'react-router-dom';
import HeaderContent from './HeaderContent';
import Sidebar from './Sidebar';
const MasterLayout = () => {
  return (
    <>
      <div className='flex h-screen overflow-hidden antialiased bg-white'>
        <Sidebar />
        <main className='relative flex-grow w-full mx-auto overflow-auto text-slate-100'>
          <HeaderContent />
          <section className='m-1 p-1'>
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default MasterLayout;

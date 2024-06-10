import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';

import TanstackReactTable from '../../data-table/TanstackReactTable';

import {
  fetchUsersList,
  updateUserStatus,
} from '../../reducers/UsersListSlice';
import ToggleButton from '../../data-table/ToggleButton';

const Users = () => {
  const columnHelper = createColumnHelper();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.usersList);

  useEffect(() => {
    dispatch(fetchUsersList());
  }, []);

  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: 'S.No',
    }),
    columnHelper.accessor('first_name', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'First Name',
    }),
    columnHelper.accessor('last_name', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Last Name',
    }),
    columnHelper.accessor('email', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Email',
    }),
    columnHelper.accessor('mobile', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Contact Number',
    }),
    columnHelper.accessor('status', {
      cell: (info) => (
        <ToggleButton
          initialValue={info.cell.row.original.is_active === 1}
          onToggle={(newStatus) => {
            dispatch(
              updateUserStatus({
                user_id: info.cell.row.original.id,
                is_active: newStatus,
              })
            );
          }}
        />
      ),
      header: 'Status',
    }),
  ];

  return (
    <>
      <div className='container mx-auto p-4 text-black'>
        <h1 className='text-2xl font-semibold mb-1'>Users Table</h1>
        <TanstackReactTable data={users} columns={columns} />
      </div>
    </>
  );
};

export default Users;

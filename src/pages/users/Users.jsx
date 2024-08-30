import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';

import TanstackReactTable from '../../data-table/TanstackReactTable';

import {
  fetchUsersList,
  updateUserStatus,
} from '../../reducers/UsersListSlice';
import ToggleButton from '../../data-table/ToggleButton';
import { FaPlus, FaTrash } from 'react-icons/fa';
import AddModal from '../Modal/AddModal';
import DeleteModal from '../Modal/DeleteModal';

const Users = () => {
  const columnHelper = createColumnHelper();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.usersList);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addData, setAddData] = useState();
  const [deleteData, setDeleteData] = useState();

  useEffect(() => {
    dispatch(fetchUsersList());
  }, []);

  const handleAdd = (rowData) => {
    setAddData(rowData);
    setOpenAddModal(true);
  };

  const handleDelete = (rowData) => {
    console.log("rowData", rowData);
    setDeleteData(rowData);
    setOpenDeleteModal(true);
  };

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
    columnHelper.accessor("created_date", {
      cell: (info) => {
        const date = new Date(info.getValue()).toISOString().split("T")[0];
        return <span>{date}</span>;
      },
      header: "Created Date",
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
    columnHelper.accessor("add", {
      cell: (info) => (
        <button onClick={() => handleAdd(info.row.original)}>
          <FaPlus className="text-blue-500 hover:text-blue-700" />
        </button>
      ),
      header: "Add",
    }),
    columnHelper.accessor("delete", {
      cell: (info) => (
        <button onClick={() => handleDelete(info.row.original)}>
          <FaTrash className="text-red-500 hover:text-red-700" />
        </button>
      ),
      header: "Delete",
    }),
  ];

  return (
    <>
      <div className='container mx-auto p-4 text-black'>
        <h1 className='text-2xl font-semibold mb-1'>Users Table</h1>
        <TanstackReactTable data={users} columns={columns} />
      </div>
      {openAddModal &&
        <AddModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          addData={addData}
        />
      }
      {openDeleteModal &&
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteData={deleteData}
        />
      }
    </>
  );
};

export default Users;

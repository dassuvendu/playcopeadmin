// import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import TanstackReactTable from "../../data-table/TanstackReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersList } from "../../reducers/OrdersListSlice";
import { FaEdit } from "react-icons/fa";
import EditModal from "../Modal/EditModal";

const Orders = () => {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();

  const { orders } = useSelector((state) => state.ordersList);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState();

  // Compare current date and plan period end date
  function getStatusAccessor(row) {
    const planPeriodEnd = new Date(row);
    const currentDate = new Date();
    return planPeriodEnd > currentDate ? "Active" : "Inactive";
  }

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("name", {
      cell: (info) => {
        if (info.cell.row.original.user.first_name && info.cell.row.original.user.last_name) {
          return <span>{info.cell.row.original.user.first_name + ' ' + info.cell.row.original.user.last_name}</span>
        } else {
          return '';
        }
      },
      header: "Name",
    }),

    columnHelper.accessor("plan.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Subscription Plan",
    }),

    columnHelper.accessor("paid_amt", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Amount",
    }),

    columnHelper.accessor("plan_period_start", {
      cell: (info) => {
        const date = new Date(info.getValue()).toISOString().split("T")[0];
        return <span>{date}</span>;
      },
      header: "Plan Start Date",
    }),

    columnHelper.accessor("plan_period_end", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Plan End Date",
    }),

    columnHelper.accessor("plan_period_end", {
      cell: (info) => (
        <span>{getStatusAccessor(info.getValue())}</span>
      ),
      header: "Status",
    }),

    columnHelper.accessor("edit", {
      cell: (info) => (
        <button onClick={() => handleEdit(info.row.original)}>
          <FaEdit className="text-blue-500 hover:text-blue-700" />
        </button>
      ),
      header: "Edit",
    }),

  ];

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setOpenEditModal(true);
  };

  useEffect(() => {
    dispatch(fetchOrdersList());
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-semibold mb-4">Orders Table</h1>
        <TanstackReactTable data={orders} columns={columns} />
      </div>
      {openEditModal &&
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          editData={editData}
        />
      }
    </>
  );
};

export default Orders;

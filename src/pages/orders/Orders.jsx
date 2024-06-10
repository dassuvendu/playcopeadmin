// import { DateTime } from "luxon";
import { useEffect } from "react";
import TanstackReactTable from "../../data-table/TanstackReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersList } from "../../reducers/OrdersListSlice";

const Orders = () => {
  const dispatch = useDispatch();  
  const columnHelper = createColumnHelper();

  const { orders } = useSelector((state) => state.ordersList);

  // Compare current date and plan period end date
  function getStatusAccessor(row){
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
        if(info.cell.row.original.user.first_name && info.cell.row.original.user.last_name) {
          return <span>{info.cell.row.original.user.first_name+' '+info.cell.row.original.user.last_name}</span>
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

    columnHelper.accessor("plan_period_end", {
      cell: (info) => (
        <span>{getStatusAccessor(info.getValue())}</span>
      ),
      header: "Status",
    }),

  ];

  useEffect(() => {
    dispatch(fetchOrdersList());
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-semibold mb-4">Orders Table</h1>
        <TanstackReactTable data={orders} columns={columns} />
      </div>
    </>
  );
};

export default Orders;

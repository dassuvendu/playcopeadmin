import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCouponList, updateStatus } from "../../reducers/CouponSlice";
import { createColumnHelper } from "@tanstack/react-table";
import ToggleButton from "../../data-table/ToggleButton";
import TanstackReactTable from "../../data-table/TanstackReactTable";
import ButtonsCoupon from "../../data-table/ButtonsCoupon";

const CouponsList = () => {
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();

  const { coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCouponList());
  }, []);

  // Compare current date and plan period end date
  // function getStatusAccessor(row) {
  //   const planPeriodEnd = new Date(row);
  //   const currentDate = new Date();
  //   return planPeriodEnd > currentDate ? "Active" : "Inactive";
  // }

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("coupon_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Coupon Name",
    }),

    columnHelper.accessor("amount_off", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Amount Off",
    }),

    columnHelper.accessor("currency", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Currency",
    }),

    columnHelper.accessor("duration_in_month", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Maximum Limit",
    }),

    columnHelper.accessor('created_at', {
      // cell: (info) =>  <span>{getStatusAccessor(info.getValue())}</span>,
      cell: (info) => {
        const date = new Date(info.getValue()).toISOString().split('T')[0];
        return <span>{date}</span>;
      },
      header: 'Created Date',
    }),

    columnHelper.accessor('end_date', {
      // cell: (info) =>  <span>{getStatusAccessor(info.getValue())}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'End Date',
    }),

    // columnHelper.accessor("edchoice", {
    //   cell: (info) => (
    //     <ToggleButton
    //       initialValue={info.cell.row.original.edchoice === 1}
    //       onToggle={(newStatus) => {
    //         dispatch(
    //           updateStatus({
    //             entity: "ed-choice",
    //             char_id: info.cell.row.original.id,
    //           })
    //         );
    //       }}
    //     />
    //   ),
    //   header: `Editor's Choice`,
    // }),

    columnHelper.accessor("status", {
      cell: (info) => (
        <ToggleButton
          initialValue={info.getValue() === 1}
          onToggle={(newStatus) => {
            dispatch(
              updateStatus({
                coupon_id: info.cell.row.original.id,
                is_active: newStatus,
              })
            );
          }}
        />
      ),
      header: `Status`,
    }),

    columnHelper.accessor("", {
      cell: (info) => <ButtonsCoupon coupon_id={info.cell.row.original.id} />,
      header: "Delete",
    }),

    // columnHelper.accessor("trendring", {
    //   cell: (info) => (
    //     <ToggleButton
    //       initialValue={info.getValue() === 1}
    //       onToggle={(newStatus) => {
    //         dispatch(
    //           updateStatus({
    //             entity: "trendring",
    //             char_id: info.cell.row.original.id,
    //           })
    //         );
    //       }}
    //     />
    //   ),
    //   header: "Trending",
    // }),

    // columnHelper.accessor("", {
    //   cell: (info) => (
    //     // <Button
    //     //   className='bg-blue-500 '
    //     //   onClick={() => handleEditButtonClick(info.cell.row.original.id)}
    //     // >
    //     //   Edit
    //     // </Button>

    //     <Link
    //       className="text-[#172554] hover:text-[#60a5fa] "
    //       to={`/edit-character/${info.cell.row.original.id}`}
    //     >
    //       <BsPencilFill className="text-xl font-bold" />
    //     </Link>
    //   ),
    //   header: "Edit",
    // }),

    // columnHelper.accessor('', {
    //   id: 'S.No',
    //   cell: (info) => <span>{info.row.index + 1}</span>,
    //   header: 'S.No',
    // }),
    // columnHelper.accessor('name', {
    //   cell: (info) => {
    //     console.log('info', info);
    //     if (
    //       info.cell.row.original.user.first_name &&
    //       info.cell.row.original.user.last_name
    //     ) {
    //       return (
    //         <span>
    //           {info.cell.row.original.user.first_name +
    //             ' ' +
    //             info.cell.row.original.user.last_name}
    //         </span>
    //       );
    //     } else {
    //       return '';
    //     }
    //   },
    //   header: 'Name',
    // }),

    // columnHelper.accessor('plan.name', {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: 'Subscription Plan',
    // }),

    // columnHelper.accessor('paid_amt', {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: 'Amount',
    // }),


  ];
  return (
    <>
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-semibold mb-4">Coupon List</h1>
        <TanstackReactTable data={coupons} columns={columns} />
      </div>
    </>
  );
};

export default CouponsList;

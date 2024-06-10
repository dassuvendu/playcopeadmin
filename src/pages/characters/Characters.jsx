// import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import TanstackReactTable from "../../data-table/TanstackReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharactersList,
  updateStatus,
} from "../../reducers/CharactersSlice";
import ToggleButton from "../../data-table/ToggleButton";
import Buttons from "../../data-table/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { BsPencilFill } from "react-icons/bs";

const Characters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();

  const { characterList } = useSelector((state) => state.characters);

  const handleEditButtonClick = (char_id) => {
    // navigate(`/edit-character/${char_id}`);
    // navigate('/edit-character', { charID: char_id });
  };

  useEffect(() => {
    dispatch(fetchCharactersList());
  }, []);

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),

    columnHelper.accessor("character_photo", {
      cell: (info) => (
        <img src={info.getValue()} className="w-10 h-10 rounded-full" />
      ),
      header: "Photo",
    }),

    columnHelper.accessor("example_conversation", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Example Conversation",
    }),
    columnHelper.accessor("edchoice", {
      cell: (info) => (
        <ToggleButton
          initialValue={info.cell.row.original.edchoice === 1}
          onToggle={(newStatus) => {
            dispatch(
              updateStatus({
                entity: "ed-choice",
                char_id: info.cell.row.original.id,
              })
            );
          }}
        />
      ),
      header: `Editor's Choice`,
    }),
    columnHelper.accessor("is_active", {
      cell: (info) => (
        <ToggleButton
          initialValue={info.getValue() === 1}
          onToggle={(newStatus) => {
            dispatch(
              updateStatus({
                entity: "is_active",
                char_id: info.cell.row.original.id,
              })
            );
          }}
        />
      ),
      header: `Is-Active`,
    }),
    columnHelper.accessor("trendring", {
      cell: (info) => (
        <ToggleButton
          initialValue={info.getValue() === 1}
          onToggle={(newStatus) => {
            dispatch(
              updateStatus({
                entity: "trendring",
                char_id: info.cell.row.original.id,
              })
            );
          }}
        />
      ),
      header: "Trending",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        // <Button
        //   className='bg-blue-500 '
        //   onClick={() => handleEditButtonClick(info.cell.row.original.id)}
        // >
        //   Edit
        // </Button>

        <Link
          className="text-[#172554] hover:text-[#60a5fa] "
          to={`/edit-character/${info.cell.row.original.id}`}
        >
          <BsPencilFill className="text-xl font-bold" />
        </Link>
      ),
      header: "Edit",
    }),
    columnHelper.accessor("", {
      cell: (info) => <Buttons char_id={info.cell.row.original.id} />,
      header: "Delete",
    }),

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

    // columnHelper.accessor('plan_period_end', {
    //   cell: (info) => <span>{getStatusAccessor(info.getValue())}</span>,
    //   header: 'Status',
    // }),
  ];

  return (
    <>
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-semibold mb-4">Characters Table</h1>
        <TanstackReactTable data={characterList} columns={columns} />
      </div>
    </>
  );
};

export default Characters;

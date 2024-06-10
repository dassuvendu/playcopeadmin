/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCharacter } from "../reducers/CharactersSlice";
import { AiFillDelete } from "react-icons/ai";

const Buttons = ({ char_id, setDeletedCharacter }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(false);
    dispatch(deleteCharacter(char_id)).then(() => setDeletedCharacter(true));
  };

  return (
    <>
      <Button
        className="text-3xl text-[#f3782b] hover:text-black"
        onClick={() => setOpenModal(true)}
      >
        <AiFillDelete className="text-2xl" />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' /> */}
            <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="text-black" onClick={() => handleClick()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Buttons;

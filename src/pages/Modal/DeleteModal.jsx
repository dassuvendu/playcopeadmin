import { Button, Modal } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, deleteUser } from "../../reducers/UsersListSlice";
import { useEffect } from "react";

const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, deleteData }) => {
    console.log("deleteData", deleteData);
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state?.usersList);

    const handleDeleteUser = () => {
        dispatch(deleteUser({ user_id: deleteData?.id })).then((res) => {
            if (res?.payload?.status_code === 200) {
                setOpenDeleteModal(false);
            }
        })
    };

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    return (
        <>
            <Modal
                show={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                size="lg"
            >
                <Modal.Header className="border-0 absolute right-2 top-2">
                    &nbsp;
                </Modal.Header>
                <Modal.Body>
                    <div className="pt-2">
                        {message && (
                            <>
                                <div className="text-red-700 text-center mt-2">{message}</div>
                            </>
                        )}
                        <div className="user_account_form py-6">
                            <form>
                                <div className="text-center font-bold text-[22px]">
                                    Are you sure you want to <span className="text-[#ff0000]">delete</span> the user?
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 p-0 gap-0">
                    <Button
                        color="gray"
                        onClick={() => setOpenDeleteModal(false)}
                        className="w-6/12 cancel_btn"
                    >
                        NO
                    </Button>
                    <Button
                        className="w-6/12 create_btn"
                        onClick={() => handleDeleteUser()}
                    >
                        {loading ? "Wait..." : "YES"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal;
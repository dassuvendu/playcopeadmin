import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersList, updatePlanDate } from "../../reducers/OrdersListSlice";

const EditModal = ({ openEditModal, setOpenEditModal, editData }) => {
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state?.ordersList);

    const formRef = useRef(null);
    const handleCreateClick = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (editData) {
            setValue("user_subscription_id", editData?.user_subscription_id);
            setValue("end_date", editData?.plan_period_end);
        }
    }, [editData, setValue]);

    const onSubmit = (data) => {
        dispatch(updatePlanDate(data)).then((res) => {
            if (res?.payload?.status_code === 200) {
                setOpenEditModal(false);
                dispatch(fetchOrdersList());
            }
        })
    };

    return (
        <>
            <Modal
                show={openEditModal}
                onClose={() => setOpenEditModal(false)}
                size="lg"
            >
                <Modal.Header className="border-0 absolute right-2 top-2">
                    &nbsp;
                </Modal.Header>
                <Modal.Body>
                    <div className="pt-2">
                        <h2 className="text-black text-[26px] font-semibold text-center pb-4">
                            Edit End Date
                        </h2>
                        {message && (
                            <>
                                <div className="text-red-700 text-center mt-2">{message}</div>
                            </>
                        )}
                        <div className="user_account_form py-8">
                            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex w-full gap-6 mb-4">
                                    <div className="w-6/12">
                                        <div className="mb-2 block">
                                            <Label
                                                value="User Id"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <TextInput
                                            type="text"
                                            required
                                            disabled
                                            {...register("user_subscription_id", { required: true })}
                                        />
                                    </div>
                                    <div className="w-6/12">
                                        <div className="mb-2 block">
                                            <Label
                                                value="Plan End Date"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <TextInput
                                            type="text"
                                            required
                                            {...register("end_date", { required: true })}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 p-0 gap-0">
                    <Button
                        color="gray"
                        onClick={() => setOpenEditModal(false)}
                        className="w-6/12 cancel_btn"
                    >
                        CANCEL
                    </Button>
                    <Button
                        className="w-6/12 create_btn"
                        onClick={handleCreateClick}
                    >
                        {loading ? "Wait..." : "Edit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditModal;
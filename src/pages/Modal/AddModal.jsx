import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptionPlans } from "../../reducers/SubscriptionsPlanSlice";
import { addUserSubscription, clearMessage } from "../../reducers/UsersListSlice";

const AddModal = ({ openAddModal, setOpenAddModal, addData }) => {
    console.log("addData", addData)
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state?.usersList);
    const { plans } = useSelector((state) => state.plans);

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
        control,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (addData) {
            setValue("email", addData?.email);
            setValue("user_id", addData?.id);
            setValue("user_name", (addData?.first_name ? addData?.first_name : " ") + " " + (addData?.last_name ? addData?.last_name : " "));
        }
    }, [addData, setValue]);

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            plan_id: parseInt(data?.plan_id, 10),
        }
        dispatch(addUserSubscription(formattedData)).then((res) => {
            if (res?.payload?.status_code === 201) {
                setOpenAddModal(false);
            }
        })
    };

    useEffect(() => {
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    return (
        <>
            <Modal
                show={openAddModal}
                onClose={() => setOpenAddModal(false)}
                size="lg"
            >
                <Modal.Header className="border-0 absolute right-2 top-2">
                    &nbsp;
                </Modal.Header>
                <Modal.Body>
                    <div className="pt-2">
                        <h2 className="text-black text-[26px] font-semibold text-center pb-4">
                            Add User Subscription
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
                                                value="Email"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <TextInput
                                            type="email"
                                            required
                                            disabled
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message:
                                                        "Entered value does not match email format",
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className="w-6/12 hidden">
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
                                            {...register("user_id", { required: true })}
                                        />
                                    </div>
                                    <div className="w-6/12">
                                        <div className="mb-2 block">
                                            <Label
                                                value="User Name"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <TextInput
                                            type="text"
                                            required
                                            disabled
                                            {...register("user_name", { required: true })}
                                        />
                                    </div>
                                    <div className="w-6/12">
                                        <div className="mb-2 block">
                                            <Label
                                                value="Plan Id"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <Controller
                                            name="plan_id"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select {...field} required>
                                                    <option value="">Select Plan Id</option>
                                                    {
                                                        plans &&
                                                        plans?.length > 0 &&
                                                        plans?.map((plan) => {
                                                            return (
                                                                <>
                                                                    <option key={plan?.id} value={`${plan?.id}`}>
                                                                        {plan?.id}
                                                                    </option>
                                                                </>
                                                            );
                                                        })}
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full gap-6 mb-4">
                                    <div className="w-6/12">
                                        <div className="mb-2 block">
                                            <Label
                                                value="Plan End Date"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <TextInput
                                            placeholder="yyyy-mm-dd"
                                            type="text"
                                            required
                                            {...register("end_date", {
                                                required: "End date is required",
                                                pattern: {
                                                    value: /^\d{4}-\d{2}-\d{2}$/,
                                                    message: "Date must be in yyyy-mm-dd format",
                                                },
                                            })}
                                        />
                                        {errors?.end_date?.message && (
                                            <small className="text-red-600">
                                                {errors.end_date.message}
                                            </small>
                                        )}
                                    </div>
                                    <div className="w-6/12">
                                        <div className="mb-2 block">
                                            <Label
                                                value="Payment Type"
                                                className="text-[#575353] text-base"
                                            />
                                        </div>
                                        <Controller
                                            name="payment_type"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select {...field} required>
                                                    <option value="">Select Payment Type</option>
                                                    <option value="paystack">paystack</option>
                                                    <option value="monnify">monnify</option>
                                                </Select>
                                            )}
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
                        onClick={() => setOpenAddModal(false)}
                        className="w-6/12 cancel_btn"
                    >
                        CANCEL
                    </Button>
                    <Button
                        className="w-6/12 create_btn"
                        onClick={handleCreateClick}
                    >
                        {loading ? "Wait..." : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddModal;
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Radio, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../reducers/CouponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("flat");

  const { message, error, isLoading } = useSelector((state) => state.coupon);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.amount_off = parseInt(data.amount_off);
    data.duration_in_month = parseInt(data.duration_in_month);
    dispatch(addCoupon(data));
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (error && message) {
      setErrorMessage(message);
    } else if (!error && message) {
      setSuccessMessage(message);
    }
  }, [message, error]);

  return (
    <>
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-semibold mb-4">Add Coupon</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-4">
              <div className="mb-2 block">
                <Label
                  className="text-base font-bold"
                  htmlFor="coupon_name"
                  value="Coupon Name"
                />
              </div>
              <TextInput type="text" placeholder="Coupon Name" {...register('coupon_name', { required: 'Coupon name is required' })} />
            </div>
            <div className="mb-4">
              {/* <div className="mb-2 block">
                <Label
                  className="text-base font-bold"
                  htmlFor="name"
                  value="Coupon Type"
                />
              </div>
              <div className="flex mb-8">
                <div className="flex items-center gap-2 mr-4">
                  <Radio
                    id="flat-discount"
                    name="countries"
                    value="flat"
                    checked={value === "flat"}
                    onChange={() => setValue("flat")}
                  />
                  <Label htmlFor="flat-discount">Flat Discount</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="discount-percentage"
                    name="countries"
                    value="percentage"
                    checked={value === "percentage"}
                    onChange={() => setValue("percentage")}
                  />
                  <Label htmlFor="discount-percentage">Discount Percentage</Label>
                </div>
              </div> */}

              {value === "flat" &&
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label
                        className="text-base font-bold"
                        htmlFor="amount_off"
                        value="Amount Off"
                      />
                    </div>
                    <TextInput type="number" placeholder="Amount" {...register('amount_off', { required: 'Amount is required' })} />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label
                        className="text-base font-bold"
                        htmlFor="currency"
                        value="Currency"
                      />
                    </div>
                    <TextInput type="text" placeholder="Currency" {...register('currency', { required: 'Currency is required' })} />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label
                        className="text-base font-bold"
                        htmlFor="name"
                        value="Maximum Limit"
                      />
                    </div>
                    <TextInput type="number" placeholder="Maximum Limit" {...register('duration_in_month', { required: 'Maximum Limit is required' })} />
                  </div>
                </div>
              }

              {/* {value === "percentage" &&
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label
                        className="text-base font-bold"
                        htmlFor="name"
                        value="Percentage Off"
                      />
                    </div>
                    <TextInput type="text" placeholder="Percentage" required />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label
                        className="text-base font-bold"
                        htmlFor="name"
                        value="Maximum Limit"
                      />
                    </div>
                    <TextInput type="text" placeholder="Maximum Limit" required />
                  </div>
                </div>
              } */}

              <div className="mt-4 block">
                <Button
                  type="submit"
                  className="bg-[#60a5fa] hover:bg-[#172554] px-2"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          {successMessage && (
            <div
              className='p-4 mb-4 text-sm text-green-800 capitalize rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
              role='alert'
            >
              <span className='font-medium'>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div
              className='w-full p-4 mb-4 text-sm text-red-800 capitalize rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              <span className='font-medium'>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddCoupon;

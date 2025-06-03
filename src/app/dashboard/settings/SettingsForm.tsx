"use client";
import TextInput from "@/components/shared/form-elements/Text-Input";
import ButtonComponent from "@/components/shared/form-elements/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const SettingsForm = ({ settings }: any) => {
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    defaultValues: { ...settings },
  });
  const { errors, isSubmitting } = formState;

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const res = await axios.patch(`/api/settings/${settings.id}`, data);

      setIsLoading(false);
      toast.success("Settings Successfully Updated!");
    } catch (err) {
      setIsLoading(false);
      toast.error(`Settings could not be updated`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-1  p-6 card lg:w-2/3   items-center"
    >
      <section className="flex-col flex gap-2 w-full">
        <TextInput
          name={"minBookingLength"}
          placeholder="Enter Minimum Booking"
          label="Minimum Booking"
          error={errors?.["minBookingLength"]?.message?.toString()}
        >
          <input
            {...register("minBookingLength", {
              required: "This field is required",

              min: {
                value: 3,
                message: "Min booking  booking must be greater than 3",
              },
            })}
            className="input-style"
            type="text"
            id="min-booking"
            defaultValue={settings.minBookingLength}
          />
        </TextInput>
        <TextInput
          name={"maxBookingLength"}
          placeholder="Enter Maximum Booking"
          label="Maximum Booking"
          error={errors?.["maxBookingLength"]?.message?.toString()}
        >
          <input
            {...register("maxBookingLength", {
              required: "This field is required",

              max: {
                value: 80,
                message: "Max booking must not be greater than 80",
              },
              min: {
                value: 0,
                message: "Max  booking must be greater than zero",
              },
            })}
            className="input-style"
            type="text"
            id="max-booking"
            defaultValue={settings.maxBookingLength}
          />
        </TextInput>

        <TextInput
          name={"maxGuestPerBooking"}
          placeholder="Enter Maximum Guest/Booking"
          label="Maximum Guest/Booking"
          error={errors?.["maxGuestPerBooking"]?.message?.toString()}
        >
          <input
            {...register("maxGuestsPerBooking", {
              required: "This field is required",

              max: {
                value: 8,
                message: "Max guest per booking must not be greater than 8",
              },
              min: {
                value: 0,
                message: "Max guest per booking must be greater than zero",
              },
            })}
            className="input-style"
            type="number"
            disabled={isSubmitting}
            id="max-guest"
            defaultValue={settings.maxGuestPerBooking}
          />
        </TextInput>
        <TextInput
          name={"breakfastPrice"}
          placeholder="Enter Breakfast Price"
          label="Breakfast Price"
          error={errors?.["breakfastPrice"]?.message?.toString()}
        >
          <input
            {...register("breakfastPrice", {
              required: "This field is required",
            })}
            className="input-style"
            type="text"
            disabled={isSubmitting}
            id="breakfast-price"
            defaultValue={settings.breakfastPrice}
          />
        </TextInput>

        {/* <label htmlFor="photo">Photo</label>
					<p>Image Upload</p> */}

        <section className="flex justify-end gap-4">
          {/* <ButtonComponent
						type="reset"
						style="rounded-3xl"
						btnText={'Cancel'}></ButtonComponent> */}

          <ButtonComponent
            type="submit"
            loading={isLoading}
            styles="rounded-3xl"
            disabled={!formState.isValid}
            btnText={"Update Setting"}
          ></ButtonComponent>
        </section>
      </section>
    </form>
  );
};

export default SettingsForm;

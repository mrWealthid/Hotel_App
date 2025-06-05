"use client";

import TextInput from "@/components/shared/form-elements/Text-Input";
import ButtonComponent from "@/components/shared/form-elements/Button";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AutoComplete from "@/components/shared/auto-complete/AutoComplete";
import { fetchCabins, fetchGuests } from "./service/bookings.service";
import { DateRangePicker } from "@/components/shared/date-picker/DatePicker";
import {
  addDays,
  differenceInDays,
  formatISO,
  startOfDay,
  endOfDay,
  parseISO,
} from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import { useCreateBooking } from "./hooks/useBookings";
import { BookingPayload } from "./model/booking.model";
import { Guest } from "../guests/model/guest.model";
import { Cabin } from "../cabins/model/cabin.model";

const BookingForm = ({ booking, onCloseModal, settings }: any) => {
  const isEditing = !!booking?.id;
  const [autoCompleteValue, setAutoCompleteValue] = useState<{
    guests: Guest;
    cabin: Cabin;
  } | null>(null);

  const [breakfastPrice, setBreakfastPrice] = useState<number>(0);
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    setValue,
    watch,
    trigger,
  } = useForm({
    mode: "all",
    defaultValues: isEditing ? { ...booking } : {},
  });

  const [hasBreakfast, setHasBreakFast] = useState(false);

  const { errors, isSubmitting, isValid, isDirty } = formState;
  const { isCreating, createBooking } = useCreateBooking(
    booking?.id,
    isEditing,
    onCloseModal
  );

  function handleAutoCompleteValues(values: any) {
    setAutoCompleteValue({ ...autoCompleteValue, ...values });
    if (values.guests) setValue("guests", values.guests.id);
    if (values.cabin) setValue("cabin", values.cabin.id);
  }

  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");

  function handleStartDate(date: any) {
    setValue("startDate", date);
    trigger("startDate"); // Trigger validation for startDate
  }
  function handleEndDate(date: any) {
    setValue("endDate", date);
    trigger("endDate"); // Trigger validation for endDate
  }

  const calculateBreakfastPrice = useCallback(() => {
    const diffInDays = differenceInDays(
      new Date(endDateValue),
      new Date(startDateValue)
    );

    return (
      parseInt(settings.breakfastPrice) *
      diffInDays *
      parseInt(getValues().numGuests)
    );
  }, [endDateValue, startDateValue, settings.breakfastPrice, getValues]);

  useEffect(() => {
    setBreakfastPrice(calculateBreakfastPrice());
  }, [isValid, calculateBreakfastPrice]);

  async function onSubmit(data: BookingPayload) {
    createBooking(BuildPayload(data));
  }

  function BuildPayload(data: BookingPayload): BookingPayload {
    const { cabin }: any = autoCompleteValue;
    const diffInDays = differenceInDays(
      new Date(endDateValue),
      new Date(startDateValue)
    );

    const dateObject_Start = new Date(startDateValue);
    const dateObject_End = new Date(endDateValue);

    const start_date = startOfDay(dateObject_Start);
    const end_date = endOfDay(dateObject_End);

    //TODO:To verify if the cabin discount is used
    return {
      ...data,
      // discount: cabin.discount,
      cabinPrice: cabin.regularPrice,
      startDate: start_date,
      endDate: end_date,
      numNights: diffInDays,
      ...(hasBreakfast && {
        hasBreakfast: hasBreakfast,
        extraPrice: breakfastPrice,
      }),
    };
  }

  function onError(err: any) {
    console.log(err);
  }

  function addBreakfast(e: any) {
    setHasBreakFast(e.target.checked);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-1 p-1 items-center"
      >
        <section className="flex-col flex gap-2 w-full">
          <AutoComplete
            queryKey="guests"
            service={fetchGuests}
            label={"Guest"}
            custom={"nationality"}
            displayValue={"name"}
            handler={handleAutoCompleteValues}
          />
          <div className="hidden">
            <TextInput
              name={"guests"}
              error={errors?.["guests"]?.message?.toString()}
            >
              <input
                title="cabin"
                {...register("guests", {
                  required: "This field is required",
                })}
                className="input-style"
                type="text"
                hidden
                readOnly
                id="guests"
              />
            </TextInput>
          </div>
          <TextInput
            name={"numGuests"}
            placeholder="Enter Number Of Guests"
            label="Number of Guest"
            error={errors?.["numGuests"]?.message?.toString()}
          >
            <input
              {...register("numGuests", {
                required: "This field is required",

                max: {
                  value: settings.maxGuestsPerBooking,
                  message: `Number of guests must not be greater than five ${settings.maxGuestsPerBooking}`,
                },
                min: {
                  value: 1,
                  message: "Number of guests must be greater than one",
                },
              })}
              className="input-style"
              type="text"
              disabled={isSubmitting}
              id="numGuests"
            />
          </TextInput>
          <AutoComplete
            queryKey="cabin"
            service={fetchCabins}
            label={"Cabin"}
            custom={"regularPrice"}
            displayValue={"name"}
            handler={handleAutoCompleteValues}
          />
          <div className="hidden">
            <TextInput
              name={"cabin"}
              error={errors?.["cabin"]?.message?.toString()}
            >
              <input
                title="cabin"
                {...register("cabin", {
                  required: "This field is required",
                })}
                className="input-style"
                type="text"
                hidden
                readOnly
                id="cabin"
              />
            </TextInput>
          </div>
          <section className="flex items-center gap-2">
            <TextInput
              name={"regularPrice"}
              placeholder="Enter regularPrice"
              label="Regular Price"
              error={errors?.["regularPrice"]?.message?.toString()}
            >
              <input
                title="regularPrice"
                value={autoCompleteValue?.cabin?.regularPrice || ""}
                readOnly
                className="input-style"
                type="text"
                id="regularPrice"
              />
            </TextInput>
            <TextInput
              name={"discount"}
              placeholder="Enter discount"
              label="Discount"
              error={errors?.["discount"]?.message?.toString()}
            >
              <input
                title="discount"
                value={autoCompleteValue?.cabin?.discount || ""}
                className="input-style"
                type="number"
                readOnly
                id="discount"
              />
            </TextInput>
          </section>

          <TextInput
            name={"observations"}
            placeholder="Enter observation"
            label="observation"
            error={errors?.["observations"]?.message?.toString()}
          >
            <textarea
              className="input-style"
              {...register("observations", {
                required: "This field is required",
              })}
              disabled={isSubmitting}
              id="observations"
              cols={40}
              rows={3}
            ></textarea>
          </TextInput>
          <DateRangePicker
            labelText={"Duration"}
            startDate={startDateValue}
            endDate={endDateValue}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            minStartDate={addDays(new Date(), 1)}
            // maxEndDate={
            // 	startDate
            // 		? addDays(startDate, settings.maxBookingLength)
            // 		: null
            // }
            minEndDate={
              startDateValue
                ? addDays(startDateValue, settings.minBookingLength)
                : // ? addDays(startDate, settings.minBookingLength)
                  null
            }
          />
          <div className="hidden">
            <TextInput name={"startDate"}>
              <input
                title="startDate"
                {...register("startDate", {
                  required: "This field is required",
                })}
                className="input-style"
                readOnly
                disabled={isSubmitting}
                id="startDate"
              />
            </TextInput>
          </div>
          <div className="hidden">
            <TextInput name={"endDate"}>
              <input
                title="endDate"
                {...register("endDate", {
                  required: "This field is required",
                })}
                className="input-style"
                readOnly
                disabled={isSubmitting}
                id="endDate"
              />
            </TextInput>
          </div>
          {formState.isValid && (
            <section className=" text-xs dark:text-white  items-center flex gap-2  mt-1">
              <input
                title="check"
                id="checkbox-all-search"
                type="checkbox"
                checked={hasBreakfast}
                onChange={addBreakfast}
                className="w-4 h-4 m-0 border-gray-300 rounded focus:ring-gray-500 "
              />
              <label htmlFor="checkbox-all-search text-sm" className="sr-only">
                #
              </label>

              <span>
                Want to add breakfast
                <span>
                  {" "}
                  for {formState.isValid && formatCurrency(breakfastPrice)}?
                </span>
              </span>
            </section>
          )}
          <hr className="-mx-6 my-3" />
          <section className="flex justify-end  gap-4">
            <ButtonComponent
              type="reset"
              handleClick={() => onCloseModal?.()}
              styles="rounded-3xl"
              btnText={"Cancel"}
            ></ButtonComponent>

            <ButtonComponent
              type="submit"
              styles="rounded-3xl"
              disabled={!isValid || isSubmitting || !isDirty}
              loading={isCreating}
              btnText={`${isEditing ? "Update Booking" : " Make Booking"}`}
            ></ButtonComponent>
          </section>
        </section>
      </form>
    </div>
  );
};

export default BookingForm;

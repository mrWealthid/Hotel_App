"use client";

import TextInput from "@/components/shared/form-elements/Text-Input";
import ButtonComponent from "@/components/shared/form-elements/Button";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateGuest } from "./hooks/useGuests";
import EmailInput from "@/components/shared/form-elements/Email-Input";
import { GuestFormProps, IGuestForm } from "./model/guest.model";

const GuestForm: FC<GuestFormProps> = ({ guest, onCloseModal }) => {
  const isEditing = !!guest?.id;
  const [autoCompleteValue, setAutoCompleteValue] = useState<{
    guests: any;
    cabin: any;
  } | null>(null);

  const { register, handleSubmit, formState } = useForm<IGuestForm>({
    mode: "all",
    defaultValues: isEditing ? { ...guest } : {},
  });

  const { errors, isSubmitting } = formState;
  const { isCreating, createGuest } = useCreateGuest(
    guest?.id,
    isEditing,
    onCloseModal
  );

  // function handleAutoCompleteValues(values: any) {
  // 	setAutoCompleteValue({ ...autoCompleteValue, ...values });
  // }

  async function onSubmit(data: any) {
    // const { cabin }: any = autoCompleteValue;

    const payload = {
      ...data,
    };

    createGuest(payload);
  }

  function onError(err: any) {
    console.log(err);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-1 items-center"
      >
        <section className="flex-col flex gap-2 w-full">
          <TextInput
            name={"name"}
            label="Name"
            error={errors?.["name"]?.message?.toString()}
          >
            <input
              title="name"
              {...register("name", {
                required: "This field is required",
              })}
              className="input-style"
              type="text"
              hidden
              id="name"
            />
          </TextInput>

          <EmailInput
            name={"email"}
            label="Email"
            error={errors?.["email"]?.message?.toString()}
          >
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="input-style"
              type="email"
              id="name"
            />
          </EmailInput>

          <TextInput
            name={"nationality"}
            label="Nationality"
            error={errors?.["nationality"]?.message?.toString()}
          >
            <input
              title="nationality"
              {...register("nationality", {
                required: "This field is required",
              })}
              className="input-style"
              type="text"
              id="nationality"
            />
          </TextInput>

          <TextInput
            name={"nationalId"}
            label="National Id"
            error={errors?.["nationalId"]?.message?.toString()}
          >
            <input
              title="nationalId"
              {...register("nationalId", {
                required: "This field is required",
              })}
              className="input-style"
              type="text"
              id="nationalId"
            />
          </TextInput>

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
              disabled={!formState.isValid || isSubmitting}
              loading={isCreating}
              btnText={` ${isEditing ? "Update guest" : " Add guest"}`}
            ></ButtonComponent>
          </section>
        </section>
      </form>
    </div>
  );
};

export default GuestForm;

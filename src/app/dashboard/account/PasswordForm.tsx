"use client";

import TextInput from "@/components/shared/form-elements/Text-Input";
import ButtonComponent from "@/components/shared/form-elements/Button";
import React from "react";
import { useForm } from "react-hook-form";
import EmailInput from "@/components/shared/form-elements/Email-Input";
import { useProfile } from "../profile/hooks/useProfile";

const PasswordForm = ({ stage, updateStage }: any) => {
  const { data, isLoading } = useProfile();
  // const isEditing = !!cabin?.id;

  // const isEditing = true;

  // console.log(data);
  // console.log(isLoading);

  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",

    // values: data
  });

  const { errors, isSubmitting } = formState;

  async function onSubmit(data: any) {
    console.log(data);
    stage === 0 && updateStage(stage + 1);
    // try {
    // 	const res = await fetch(`http://localhost:3000/api/user`, {
    // 		method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    // 		body: JSON.stringify(data) // body data type must match "Content-Type" header
    // 	});

    // 	if (!res.ok) {
    // 		throw new Error(
    // 			`Cabin could not be created Status: ${res.status}`
    // 		);
    // 	}
    // 	stage === 0 && updateStage(stage + 1);
    // 	return res.json(); // parses JSON response into native JavaScript objects
    // } catch (err) {
    // 	console.log(err);
    // }
  }

  function onError(err: any) {
    console.log(err);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-3"
    >
      <TextInput
        name={"password"}
        placeholder="Enter Password"
        label="Password"
        type="password"
      >
        <input
          {...register("password", {
            required: "This field is required",
          })}
          className="input-style"
          type="password"
          id="password"
        />
      </TextInput>
      <TextInput
        name={"confirmPassword"}
        placeholder="Enter Password"
        label="Confirm Password"
      >
        <input
          {...register("confirmPassword", {
            required: "This field is required",
          })}
          className="input-style"
          type="password"
          id="confirmPassword"
        />
      </TextInput>

      <div className="mt-2 gap-3 flex justify-end ">
        <ButtonComponent
          type="reset"
          handleClick={() => updateStage(0)}
          styles="rounded-3xl"
          btnText={"Cancel"}
        ></ButtonComponent>

        <ButtonComponent
          type="submit"
          styles="rounded-3xl"
          disabled={!formState.isValid}
          btnText={"Update Profile"}
        ></ButtonComponent>
      </div>
    </form>
  );
};

export default PasswordForm;

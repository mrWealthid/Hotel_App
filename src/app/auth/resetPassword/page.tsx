"use client";

import EmailInput from "@/components/shared/form-elements/Email-Input";
import TextInput from "@/components/shared/form-elements/Text-Input";
import ButtonComponent from "@/components/shared/form-elements/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useResetPassword } from "../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axiosInstance from '@/app/utils/intercerptor';

const ResetPasswordComponent = () => {
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    // defaultValues: { email: 'admin@gmail.com', password: '12345678' }
  });

  const router = useRouter();
  const { isLoading, resetPassword } = useResetPassword();

  async function onSubmit(payload: any) {
    resetPassword(payload);
  }

  const { errors, isSubmitting } = formState;

  function onError(err: any) {
    console.log(err);
  }

  // async function send() {
  // 	'use server';
  // }

  return (
    <>
      <section className="flex flex-col min-h-screen h-fit items-center justify-center">
        <section className="bg-white dark:glass w-5/6 md:w-4/6 lg:w-1/3 py-10 px-5 flex gap-4 flex-col items-center justify-center">
          <p className="text-center text-primary dark:text-label-color font-bold text-2xl">
            Reset Password
          </p>

          <section className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              action=""
              className="w-full flex flex-col justify-center gap-2 items-center"
            >
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

              <ButtonComponent
                styles="w-full mt-4"
                btnText="Reset"
                loading={isLoading}
                type="submit"
                disabled={!formState.isValid || isLoading}
              />

              <p className="flex gap-3 text-sm text-primary dark:text-label-color">
                Need An Account ?
                <Link href={"/auth/signup"} className="text-blue-600 text-sm">
                  Sign up
                </Link>
              </p>
            </form>
          </section>
        </section>
      </section>
    </>
  );
};

export default ResetPasswordComponent;

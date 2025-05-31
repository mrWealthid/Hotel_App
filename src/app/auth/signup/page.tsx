"use client";
// import axiosInstance from '@/app/utils/intercerptor';
import EmailInput from "@/components/shared/Form-inputs/Email-Input";
import TextInput from "@/components/shared/Form-inputs/Text-Input";
import ButtonComponent from "@/components/shared/Form-inputs/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const SignupComponent = () => {
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });

  const router = useRouter();

  const { isLoading, registering } = useRegister();
  const { errors, isSubmitting } = formState;

  async function onSubmit(data: any) {
    const { firstName, lastName, ...rest } = data;

    const payload = { name: firstName + " " + lastName, ...rest };

    registering(payload, { onSuccess: () => router.push("/dashboard") });
  }

  function onError(err: any) {
    console.log(err);
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="flex flex-col min-h-screen items-center justify-center">
        <section className="bg-white dark:glass lg:my-5 w-5/6 md:w-4/6 lg:w-1/2  p-10 flex gap-6 flex-col items-center justify-center">
          <p className="text-center text-primary dark:text-label-color font-bold text-2xl">
            Sign Up
          </p>

          {/* <section className="flex flex-col gap-3 items-center justify-center w-full">
						<button className="btn flex gap-3 btn-primary">
							Google
						</button>

						<section className="text-primary dark:text-secondary">
							Or
						</section>
					</section> */}
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full flex flex-col gap-2 items-center"
          >
            <div className="w-full flex gap-4">
              <TextInput
                name={"firstName"}
                label="First Name"
                type="password"
                error={errors?.["firstName"]?.message?.toString()}
              >
                <input
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                  className="input-style"
                  type="text"
                  id="firstName"
                  placeholder="Enter First Name"
                />
              </TextInput>
              <TextInput
                name={"lastName"}
                label="Last Name"
                error={errors?.["lastName"]?.message?.toString()}
              >
                <input
                  {...register("lastName", {
                    required: "This field is required",
                  })}
                  className="input-style"
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                />
              </TextInput>
            </div>
            <div className="w-full flex gap-4">
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
                  className="input-style  "
                  type="email"
                  id="email"
                  placeholder="johndoe@gmail.com"
                />
              </EmailInput>

              <TextInput
                name={"password"}
                placeholder="Enter Password"
                label="Password"
                error={errors?.["password"]?.message?.toString()}
              >
                <div className="input-style !p-0 !pr-2 !overflow-hidden">
                  <input
                    placeholder="Enter Password"
                    className="w-full  dark:bg-transparent  border-none outline-none focus:ring-0 ring-0 "
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "This field is required",
                    })}
                    id="psw"
                  />

                  {!showPassword ? (
                    <FaEyeSlash
                      className="text-primary cursor-pointer"
                      onClick={togglePassword}
                    />
                  ) : (
                    <FaEye
                      className="text-primary cursor-pointer"
                      onClick={togglePassword}
                    />
                  )}
                </div>
              </TextInput>
            </div>

            <section className=" ">
              <ButtonComponent
                styles="rounded-3xl"
                btnText="Submit"
                type="submit"
                loading={isLoading}
                disabled={!formState.isValid || isLoading}
                // afterIcon="/assets/send.svg"
              />
            </section>
            <p className="text-sm text-primary dark:text-label-color flex gap-2">
              Already Have An Account ?
              <Link href={"/auth/login"} className="text-blue-600 text-sm">
                Login
              </Link>
            </p>
          </form>
        </section>
      </section>
    </>
  );
};

export default SignupComponent;

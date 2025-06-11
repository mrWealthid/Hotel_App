import { Router } from "next/router";
import { useMutation } from "@tanstack/react-query";
import {
  handleForgetPassword,
  handleLogin,
  handleLogout,
  handleRegister,
  handleResetPassword,
} from "../service/auth-service";

import toast from "react-hot-toast";
import { handleClientErrorMessage } from "@/utils/helpers";
import {
  ILogin,
  IRegister,
  IResetPassword,
  IUpdatePassword,
} from "../model/model";
import { ApiError } from "@/components/shared/model/model";

export function useLogin() {
  const { isLoading, mutate: login } = useMutation({
    mutationFn: (payload: ILogin) => handleLogin(payload),
    onError: (err: ApiError) => toast.error(err.message),
  });

  return {
    isLoading,
    login,
  };
}
export function useRegister() {
  const { isLoading, mutate: registering } = useMutation({
    mutationFn: (payload: IRegister) => handleRegister(payload),

    onError: (err: ApiError) => toast.error(err.message),
  });

  return {
    isLoading,
    registering,
  };
}
export function useLogout(router: any) {
  const { isLoading, mutate: loggingOut } = useMutation({
    mutationFn: () => handleLogout(),
    onSuccess: () => router.push("/auth/login"),
    onError: (err: ApiError) => toast.error(err.message),
  });

  return {
    isLoading,
    loggingOut,
  };
}
export function useResetPassword() {
  const { isLoading, mutate: resetPassword } = useMutation({
    mutationFn: (payload: IResetPassword) => handleForgetPassword(payload),
    onSuccess: (data) => toast.success(data.message),
    onError: (err: ApiError) => toast.error(err.message),
  });

  return {
    isLoading,
    resetPassword,
  };
}
export function useUpdatePassword() {
  const { isLoading, mutate: updatePassword } = useMutation({
    mutationFn: (payload: IUpdatePassword) => handleResetPassword(payload),
    onSuccess: (data) => toast.success(data.message),
    onError: (err: ApiError) => toast.error(err.message),
  });

  return {
    isLoading,
    updatePassword,
  };
}

// const { isLoading, data, error } = useMutation({
// 	queryKey: ['auth'],
// 	queryFn: () => handleRegister(payload),

// 	onSuccess: () => {
// 		router.push('/dashboard');
// 	},
// 	onError: (err: any) => toast.error(err.message)
// });

// return {
// 	isLoading,
// 	error,
// 	data: data?.data
// };

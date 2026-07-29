import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api/axios";
import { RegisterFormData } from "../schemas/auth.schema";
import type { RegisterResponse, ApiErrorResponse } from "../types";

export const useRegister = () => {
  return useMutation<
    RegisterResponse,
    AxiosError<ApiErrorResponse>,
    RegisterFormData
  >({
    mutationFn: async (data: RegisterFormData) => {
      const response = await api.post<RegisterResponse>("/users/add", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
  });
};
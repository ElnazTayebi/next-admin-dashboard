import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/axios";
import { LoginFormData } from "../schemas/auth.schema";
import type { AuthResponse, ApiErrorResponse } from "../types";

export const useLogin = () => {
  const router = useRouter();
  return useMutation<AuthResponse, AxiosError<ApiErrorResponse>, LoginFormData>(
    {
      mutationFn: async (data: LoginFormData) => {
        const response = await api.post<AuthResponse>("/auth/login", {
          username: data.username,
          password: data.password,
          expiresInMins: 60,
        });
        return response.data;
      },

      onSuccess: (data) => {
        Cookies.set("token", data.accessToken, { expires: 1, path: "/" });
        Cookies.set("user", JSON.stringify(data), { expires: 1, path: "/" });

        router.push("/dashboard");
        router.refresh();
      },
    },
  );
};
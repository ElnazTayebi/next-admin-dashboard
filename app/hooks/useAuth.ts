import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { api } from "@/lib/axios";
import { LoginFormData, RegisterFormData } from "@/app/schemas/auth.schema";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface ApiErrorResponse {
  message: string;
}
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

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });

    queryClient.clear();

    router.push("/login");
    router.refresh();
  };

  return { logout };
};

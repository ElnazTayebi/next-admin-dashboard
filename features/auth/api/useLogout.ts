import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

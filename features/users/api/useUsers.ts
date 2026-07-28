import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "./getUsers";

export function useUsers(page: number = 1, limit: number = 10, q: string = "") {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ["users", page, limit, q],
    queryFn: () => getUsers({ limit, skip, q }),
    placeholderData: keepPreviousData, 
  });
}
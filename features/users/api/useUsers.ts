import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "./getUsers";

export function useUsers(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers({ limit, skip }),
    placeholderData: keepPreviousData, 
  });
}
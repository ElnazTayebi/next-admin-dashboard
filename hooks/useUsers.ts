import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api/users";

export function useUsers(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers({ limit, skip }),
    placeholderData: keepPreviousData, 
  });
}
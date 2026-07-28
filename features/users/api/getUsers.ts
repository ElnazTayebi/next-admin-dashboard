import { api } from "@/lib/api/axios";

export interface FetchUsersParams {
  limit?: number;
  skip?: number;
  q?: string;
}

export async function getUsers({
  limit = 10,
  skip = 0,
  q = "",
}: FetchUsersParams = {}) {
  const { data } = await api.get("/users/search", { 
    params: {
      limit,
      skip,
      ...(q && { q }), 
    },
  });
  return data;
}

import { api } from "@/lib/axios";

export interface FetchUsersParams {
  limit?: number;
  skip?:number;
}

export async function fetchUsers({limit = 10, skip = 0}:FetchUsersParams = {}) {
  const { data } = await api.get(`/users?limit=${limit}&skip=${skip}`);
  return data;
}

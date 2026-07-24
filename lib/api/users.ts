import { api } from "@/lib/axios";



export async function fetchUsers() {
  const { data } = await api.get("/users?limit=10");
  return data.users;
}
// app/dashboard/users/page.tsx

import UserSearch from "@/features/users/components/UserSearch";
import UsersTable from "@/features/users/components/UserTable";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Suspense fallback={<div>Loading search...</div>}>
          <UserSearch />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersTable />
      </Suspense>
    </div>
  );
}

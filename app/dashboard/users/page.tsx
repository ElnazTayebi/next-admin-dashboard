// app/dashboard/users/page.tsx

import UsersTable from "@/features/users/components/UserTable";
import { Suspense } from "react";

export default function UsersPage() {
  return <Suspense fallback={<div>Loading users...</div>}>
      <UsersTable />
    </Suspense>
}

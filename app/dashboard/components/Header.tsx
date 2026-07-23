"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useLogout } from "@/app/hooks/useAuth";

interface UserData {
  firstName: string;
  lastName: string;
  image: string;
  username: string;
}

export default function Header() {

  const { logout } = useLogout();
const [user] = useState<UserData | null>(() => {
    const userData = Cookies.get("user");
    if (!userData) return null;
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user cookie", error);
      return null;
    }
  });


  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
      <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>

      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={user.image}
              alt={user.username}
              width={40}
              height={40}
              className="rounded-full border border-gray-200"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-gray-500 text-xs">@{user.username}</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors font-medium ml-2"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
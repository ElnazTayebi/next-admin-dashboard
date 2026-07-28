"use client";

import { useSyncExternalStore } from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/hook/useAuth";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

interface UserData {
  firstName: string;
  lastName: string;
  image: string;
  username: string;
}

let cachedRawCookie: string | undefined = undefined;
let cachedUserData: UserData | null = null;

function getUserSnapshot(): UserData | null {
  const currentCookie = Cookies.get("user");
  if (currentCookie === cachedRawCookie) return cachedUserData;

  cachedRawCookie = currentCookie;
  if (!currentCookie) {
    cachedUserData = null;
  } else {
    try {
      cachedUserData = JSON.parse(currentCookie);
    } catch {
      cachedUserData = null;
    }
  }
  return cachedUserData;
}

function getServerSnapshot(): UserData | null {
  return null;
}

function subscribe(callback: () => void) {
  return () => {};
}

export default function Header() {
  const { logout } = useLogout();

  const user = useSyncExternalStore(
    subscribe,
    getUserSnapshot,
    getServerSnapshot,
  );

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <h1 className="text-base font-semibold text-foreground">
        Admin Dashboard
      </h1>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center gap-3 p-1.5 h-auto hover:bg-accent rounded-full sm:rounded-lg"
            >
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left text-sm hidden sm:flex">
                <span className="font-semibold leading-tight text-foreground">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-muted-foreground text-xs">
                  @{user.username}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="flex items-center justify-between px-2 py-1.5 text-sm">
              <span className="text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="w-32 h-9 bg-muted animate-pulse rounded-lg" />
      )}
    </header>
  );
}

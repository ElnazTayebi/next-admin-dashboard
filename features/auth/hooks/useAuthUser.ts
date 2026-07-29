import { useSyncExternalStore } from "react";
import Cookies from "js-cookie";

export interface UserData {
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

export function useAuthUser() {
  const user = useSyncExternalStore(
    subscribe,
    getUserSnapshot,
    getServerSnapshot,
  );
  return { user };
}

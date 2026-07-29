"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
/* import { Input } from "@/components/ui/input"; */
import { Search } from "lucide-react";
import InputField from "@/components/InputField";

export default function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

 
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    const currentQuery = params.get("q") || "";

   
    if (term.trim() === currentQuery) return;

    
    params.set("page", "1");

    if (term.trim()) {
      params.set("q", term.trim());
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        size={18}
      />
      <InputField
        placeholder="Search users..."
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="pr-10" 
      />
    </div>
  );
}
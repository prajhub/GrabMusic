"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/spotify-api";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/spotify-api";
import { SpinnerOne } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export default function ProfileDropdown() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    router.push("/api/login");
  };

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: isClient && !!localStorage.getItem("access_token"),
  });

  if (isLoading) {
    return (
      <div>
        <SpinnerOne />
      </div>
    );
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={data?.images?.[0]?.url}
                alt={data?.display_name}
              />
              <AvatarFallback>{data?.display_name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{data?.display_name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={handleLogin}
          className="bg-[#44183b] tracking-wide hover:bg-[#2f0a26] text-lg text-white py-5 rounded-full px-8"
        >
          Log in
        </Button>
      )}
    </>
  );
}

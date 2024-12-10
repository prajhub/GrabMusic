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
import { UserProfile } from "@/lib/util";

export default function ProfileDropdown({
  userProfile,
  refetchUserProfile,
}: {
  userProfile: UserProfile;
  refetchUserProfile: () => void;
}) {
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    refetchUserProfile();
    router.push("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={userProfile?.images?.[0]?.url}
              alt={userProfile?.display_name}
            />
            <AvatarFallback>
              {userProfile?.display_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{userProfile?.display_name}</DropdownMenuLabel>
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
    </>
  );
}

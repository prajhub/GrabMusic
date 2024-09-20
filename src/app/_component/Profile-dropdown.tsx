import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/spotify-api";
import Spinner from "@/components/ui/spinner";

export default function ProfileDropdown() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.images?.[0]?.url} alt={data?.display_name} />
          <AvatarFallback>{data?.display_name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data?.display_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

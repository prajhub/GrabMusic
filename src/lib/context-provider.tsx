import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/spotify-api";

const UserContext = createContext<{ user: any; isLoading: boolean }>({
  user: null,
  isLoading: true,
});

export const UserProvider: React.FC = ({ children }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <UserContext.Provider value={{ user: data || null, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

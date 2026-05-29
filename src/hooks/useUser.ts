import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getUser } from "../api/Users";

export const useUser = () => {
  const {
    error,
    data: userInfo,
    isPending,
  } = useQuery({
    queryFn: () => getUser(),
    queryKey: queryKeys.profile,
    retry: false,
  });

  return { error, userInfo, isPending };
};

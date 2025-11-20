import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-hero";

export const useHero = (idSlug: string) => {
  const queryHero = useQuery({
    queryKey: ["hero", { idSlug }],
    queryFn: () => getHero(idSlug),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    queryHero,
  };
};

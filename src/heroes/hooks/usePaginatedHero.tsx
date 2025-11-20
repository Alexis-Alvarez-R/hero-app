import { useQuery } from "@tanstack/react-query";
import { getHeroesByPage } from "../actions/get-heroes-by-page";

export const usePaginatedHero = (page: number, limit: number, category: string = "all") => {
  const queryHeroesResponse = useQuery({
    queryKey: ["Heroes", { page, limit, category }],
    queryFn: () => getHeroesByPage(+page, +limit, category),
    staleTime: 1000 * 60 * 5, //5 minutos
  });

  return {
    queryHeroesResponse,
  };
};

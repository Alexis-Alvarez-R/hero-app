import { useQuery } from "@tanstack/react-query";
import { searchHeroes, type Options } from "../actions/search-heros";

export const useSearch = (options: Options) => {
  const querySearch = useQuery({
    queryKey: ["search", { options }],
    queryFn: () => searchHeroes(options),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  return {
    querySearch,
  };
};

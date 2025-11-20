import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../actions/get-summary";

export const useSummary = () => {
  const querySummary = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60 * 5,
  });
  return {
    querySummary,
  };
};

import { heroApi } from "../api/hero.api";
import type { SummaryResponse } from "../interface/heroSummary";

export const getSummary = async (): Promise<SummaryResponse> => {
  const { data } = await heroApi.get<SummaryResponse>("/summary");

  return data;
};

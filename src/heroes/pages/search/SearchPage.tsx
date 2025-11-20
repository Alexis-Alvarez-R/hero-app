import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroesStats } from "../hero/components/HeroesStats";
import { SearchControlls } from "./components/SearchControlls";
import { HeroesGrid } from "../hero/components/HeroesGrid";
import { useSearch } from "@/heroes/hooks/useSearch";
import { useSearchParams } from "react-router";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? "";
  const strength = searchParams.get("strength") ?? "";
  const category = searchParams.get("category") ?? "";
  const universe = searchParams.get("universe") ?? "";
  const status = searchParams.get("status") ?? "";

  const { querySearch } = useSearch({ name, strength, category, universe, status });
  return (
    <>
      <CustomHeader title="SuperHero Busqueda" description="Explora y Descubre sobre superheroes"></CustomHeader>
      <HeroesStats></HeroesStats>
      <SearchControlls></SearchControlls>
      <HeroesGrid heroes={querySearch.data ?? []}></HeroesGrid>
    </>
  );
};

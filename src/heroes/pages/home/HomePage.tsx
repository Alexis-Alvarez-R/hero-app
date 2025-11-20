import { use, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroesStats } from "../hero/components/HeroesStats";
import { HeroesGrid } from "../hero/components/HeroesGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { useSummary } from "@/heroes/hooks/useSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const { querySummary } = useSummary();

  const { queryHeroesResponse } = usePaginatedHero(+page, +limit, category);

  const validateTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];

    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  return (
    <>
      <>
        {/* Header */}
        <CustomHeader title="SuperHero Universe" description="Explora y Descubre sobre superheroes"></CustomHeader>

        {/* Stats Dashboard */}
        <HeroesStats></HeroesStats>

        {/* Tabs */}
        <Tabs value={validateTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value={activeTab}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");

                  return prev;
                })
              }
            >
              All Characters ({querySummary.data?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value={validateTab}
              className="flex items-center gap-2"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");

                  return prev;
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value={validateTab}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");

                  return prev;
                })
              }
            >
              Heroes ({querySummary.data?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value={validateTab}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");

                  return prev;
                })
              }
            >
              Villains ({querySummary.data?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>Todos Los personajes</h1>
            <HeroesGrid heroes={queryHeroesResponse.data?.heroes ?? []}></HeroesGrid>
          </TabsContent>

          <TabsContent value="favorites">
            <h1>Favoritos</h1>
            <HeroesGrid heroes={favorites}></HeroesGrid>
          </TabsContent>

          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroesGrid heroes={queryHeroesResponse.data?.heroes ?? []}></HeroesGrid>
          </TabsContent>

          <TabsContent value="villains">
            <h1>Villanos</h1>
            <HeroesGrid heroes={queryHeroesResponse.data?.heroes ?? []}></HeroesGrid>
          </TabsContent>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div>

        {activeTab !== "favorites" && (
          <CustomPagination totalPages={queryHeroesResponse.data?.pages ?? 2}></CustomPagination>
        )}

        {/* Pagination */}
      </>
    </>
  );
};

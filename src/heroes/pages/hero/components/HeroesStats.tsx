import { useContext } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Zap, Trophy } from "lucide-react";

import { HeroeStatCard } from "./HeroeStatCard";
import { useSummary } from "@/heroes/hooks/useSummary";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HeroesStats = () => {
  const { querySummary } = useSummary();
  const { favoriteCount } = useContext(FavoriteHeroContext);

  if (!querySummary.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Personajes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{querySummary.data?.totalHeroes}</div>
            <div className="flex gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">
                {`${querySummary.data?.heroCount} Heroes`}
              </Badge>
              <Badge variant="destructive" className="text-xs">
                {`${querySummary.data?.villainCount} Villains`}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <HeroeStatCard title="Favoritos" icon={<Heart className="h-4 w-4 text-muted-foreground" />}>
          <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
          <p className="text-xs text-muted-foreground">
            {((favoriteCount / querySummary.data?.totalHeroes) * 100).toFixed(2)}% of total
          </p>
        </HeroeStatCard>

        <HeroeStatCard title="Fuerte" icon={<Zap className="h-4 w-4 text-muted-foreground" />}>
          <div className="text-lg font-bold">{querySummary.data?.strongestHero.alias}</div>
          <p className="text-xs text-muted-foreground">{`Strength: ${querySummary.data?.strongestHero.strength}/10`}</p>
        </HeroeStatCard>

        <HeroeStatCard title="Inteligente" icon={<Trophy className="h-4 w-4 text-muted-foreground" />}>
          <div className="text-lg font-bold">{querySummary.data?.smartestHero.alias}</div>
          <p className="text-xs text-muted-foreground">{`Intelligence: ${querySummary.data?.smartestHero.intelligence}/10`}</p>
        </HeroeStatCard>
      </div>
    </>
  );
};

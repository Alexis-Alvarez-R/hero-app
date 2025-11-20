import { HeroGridCard } from "./HeroGridCard";
import type { Hero } from "@/heroes/interface/hero";

interface Props {
  heroes: Hero[];
}

export const HeroesGrid = ({ heroes }: Props) => {
  if (!heroes || heroes.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl font-semibold text-gray-500 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          No se encontraron Personajes.
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {heroes.map((hero) => (
          <HeroGridCard hero={hero} key={hero.id}></HeroGridCard>
        ))}
      </div>
    </div>
  );
};

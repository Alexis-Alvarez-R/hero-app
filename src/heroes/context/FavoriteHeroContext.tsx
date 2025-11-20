import { createContext, useEffect, useState, type PropsWithChildren } from "react";

import * as z from "zod/v4";

import type { Hero } from "../interface/hero";

interface FavoriteHeroContext {
  //state
  favorites: Hero[];
  favoriteCount: number;

  //methods

  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext<FavoriteHeroContext>({} as FavoriteHeroContext);

//validacion con zod del localStorage

const favoritesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    alias: z.string(),
    powers: z.array(z.string()),
    description: z.string(),
    strength: z.number(),
    intelligence: z.number(),
    speed: z.number(),
    durability: z.number(),
    team: z.string(),
    image: z.string(),
    firstAppearance: z.string(),
    status: z.string(),
    category: z.string(),
    universe: z.string(),
  })
);

const getFavoritesFromLocalStorage = (): Hero[] => {
  try {
    const favoritesH = localStorage.getItem("favorites");
    if (!favoritesH) return [];

    const result = favoritesSchema.safeParse(JSON.parse(favoritesH));

    if (result.success) {
      return result.data;
    }

    console.warn("Datos inválidos en localStorage:", result.error);
    return [];
  } catch (err) {
    console.error("Error leyendo localStorage:", err);
    return [];
  }
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

  const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);

  const toggleFavorite = (hero: Hero) => {
    const exists = favorites.some((h) => h.id === hero.id);

    const updated = exists ? favorites.filter((h) => h.id !== hero.id) : [...favorites, hero];

    setFavorites(updated);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};

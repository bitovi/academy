import { pokemonTrainers } from "./ex-01";

export type Pokemon = typeof pokemonTrainers[number]["favoritePokemon"];

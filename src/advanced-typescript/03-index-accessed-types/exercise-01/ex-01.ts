/**
 * Below is an array of Pokemon trainers and a `FavoritePokemon` type currently assigned to any.
 * Using the `pokemonTrainers` array replace the `any` with a type that has the same shape as `favoritePokemon` on the
 * trainers in the array.
 *
 * > Hint:
 * > An array is just an object indexed with a number
 */
export const pokemonTrainers = [
  {
    name: "Ash",
    favoritePokemon: {
      name: "Pikachu",
      pokedexNumber: 25,
      type: ["Electric"],
      attacks: [
        { title: "Quick Attack", type: "Normal", power: 40, accuracy: 100 },
        { title: "Thunder", type: "Electric", power: 110, accuracy: 70 },
        { title: "Volt Switch", type: "Electric", power: 70, accuracy: 100 },
      ],
    },
  },
  {
    name: "Brock",
    favoritePokemon: {
      name: "Onix",
      pokedexNumber: 95,
      type: ["Rock", "Ground"],
      attacks: [
        { title: "Tackle", type: "Normal", power: 40, accuracy: 100 },
        { title: "Iron Tail", type: "Steel", power: 100, accuracy: 75 },
        { title: "Rock Slide", type: "Rock", power: 75, accuracy: 90 },
      ],
    },
  },
];

type FavoritePokemon = any;

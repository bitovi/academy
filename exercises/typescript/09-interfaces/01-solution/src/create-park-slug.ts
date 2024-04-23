import DinoPark from "./dino-park";

export function createParkSlug(dinoPark: DinoPark) {
  return dinoPark.name.replace(/ /g, '-');
}
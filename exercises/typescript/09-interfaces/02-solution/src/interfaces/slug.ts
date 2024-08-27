import DinoPark from "./dinoPark";

export function createParkSlug(dinoPark: DinoPark) {
  return dinoPark.name.toLowerCase().replace(/ /g, '-');
}
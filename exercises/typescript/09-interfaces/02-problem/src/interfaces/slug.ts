
export default function createParkSlug(dinoPark) {
  return dinoPark.name.toLowerCase().replace(/ /g, '-');
}
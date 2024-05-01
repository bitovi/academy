
export default function createParkSlug(dinoPark) {
  return dinoPark.name.replace(/ /g, '-');
}
type DinoDNAMixer = (dino1: string, dino2: string, spliceIdx: number) => string;

interface DinoFactory {
  makeDino: DinoDNAMixer;
  factoryName: string;
}
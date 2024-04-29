interface DinoDNAMixer {
  (dino1: string, dino2: string, spliceIdx: number): string;
}

const dinoMaker: DinoDNAMixer = function (dino1: string, dino2: string, spliceIdx: number): string {
  return dino1.substring(spliceIdx) + dino2.substring(spliceIdx);
}

const newDino = dinoMaker('CGGCAD', 'ACGCAA', 3);
console.info(newDino); // Logs 'CADCAA'
interface DinoDNAMixer {
  (dino1: string, dino2: string, spliceIdx: number): string;
}

let dinoMaker : DinoDNAMixer = function (dino1: string, dino2: string, spliceIdx: number): string {
  return dino1.substring(spliceIdx) + dino2.substring(spliceIdx);
}

let newDino = dinoMaker('CGGCAD', 'ACGCAA', 3)
console.log(newDino); //logs 'CADCAA'

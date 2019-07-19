function bonusMaker(multiplier, name) {
  return multiplier*name.length
}

let ClaireBonus = bonusMaker(2500, 'Indominous Rex');
console.log(ClaireBonus);
//Logs "35000"

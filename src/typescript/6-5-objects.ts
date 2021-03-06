interface DinoInfo {
  name:string;
  location:string;
}

function owensCatcher(info: DinoInfo) {
  console.log(`Owen caught ${info.name} at ${info.location}`);
}

owensCatcher({name: 'Blue', location: 'Section B'});
//Logs "Owen caught Blue at Section B"
owensCatcher({name: 'Charlie'});
//property 'location' is missing //error

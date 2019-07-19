interface ResponseConfig {
  error?: string;
  response: string;
}

class DinoCage {
  static cageInstances: number = 0;
  static dinos: number = 0;
  constructor(dinos: number) {
    DinoCage.dinos = DinoCage.dinos + dinos;
    DinoCage.cageInstances++;
  }

  static countDinos() {
    return `${this.dinos} dinosaurs`;
  }
}

class RaptorCage extends DinoCage {
  public raptors: number;
  constructor (dinos: number) {
    super(dinos);
    this.raptors = dinos;
  }

  public securityCheck() : ResponseConfig {
    if (this.raptors < 7) {
      return { response: 'security check passes'}
    }
    else {
      return {error: "FAILURE", response: 'hold on to your butts'}
    }
  }
}

// services/team.js
const TeamService = {
  async list() {},
  async retrieve(id) {},
  async create() {},
  async update(id, delta) {},
  async remove(id) {},
};

// stores/team.js
class TeamStore extends BaseStore {
  get data() {
    return [];
  }

  constructor(props) {
    super(props);
    
    this._initialize();
  }

  async _dontExpose() {}
  async _initialize() {
    this.data = await this.TeamService.list(...args);
  }

  async addPlayers(newTeam, players) {
    this.data = this.data.map((team) => {
      if (team.id !== newTeam.id) {
        return team;
      }

      return { ...team, players: team.players.concat(players) };
    });

    await this.TeamService.update(team.id, { players: team.players.concat(players) });
  }
}

export default createHook(TeamStore, { TeamService });
// useTeams.Provider

// app.js
function App() {
  const [ teams, { ...lcrud, addPlayers } ] = useTeams();

  function handleClick() {
    create({ name });
  }

  return (<div />);
}

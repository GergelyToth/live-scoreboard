interface Match {
  homeName: string,
  homeScore: number,
  awayName: string,
  awayScore: number,
  created: Date,
  isLive: boolean,
};

class Scoreboard {
  private score: Match[] = [];

  start(homeName: string, awayName: string) {
    this.score.push({
      homeName,
      homeScore: 0,
      awayName,
      awayScore: 0,
      created: new Date(),
      isLive: true,
    });
  }

  displayCurrentMatch(): string {
    const match =  this.score.find((match) => match.isLive);

    if (!match) {
      return 'There are no teams playing at the moment.';
    }

    return `${match.homeName} ${match.homeScore} - ${match.awayScore} ${match.awayName}`;
  }
}

export default Scoreboard;

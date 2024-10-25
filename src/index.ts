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

  start(homeName: string, awayName: string): void {
    this.score.push({
      homeName,
      homeScore: 0,
      awayName,
      awayScore: 0,
      created: new Date(),
      isLive: true,
    });
  }

  updateScore(homeScore: number, awayScore: number): void {
    const match = this.getCurrentMatch();
    if (!match) {
      throw new Error('No matches are currently in progress');
    }

    if (homeScore < 0 || awayScore < 0) {
      throw new Error('Invalid score');
    }

    match.homeScore = Math.trunc(homeScore);
    match.awayScore = Math.trunc(awayScore);
  }

  getCurrentMatch() {
    return this.score.find((match) => match.isLive);
  }

  displayCurrentScore(): string {
    const match = this.getCurrentMatch();

    if (!match) {
      return 'There are no teams playing at the moment.';
    }

    return `${match.homeName} ${match.homeScore} - ${match.awayScore} ${match.awayName}`;
  }
}

export default Scoreboard;

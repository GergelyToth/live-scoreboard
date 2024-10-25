interface Match {
  homeName: string,
  homeScore: number,
  awayName: string,
  awayScore: number,
  created: Date,
};

const NO_MATCH_ERROR = 'No matches are currently in progress';

class Scoreboard {
  private score: Match[] = [];
  private currentMatch: Match | null = null;

  start(homeName: string, awayName: string): void {
    this.currentMatch = {
      homeName,
      homeScore: 0,
      awayName,
      awayScore: 0,
      created: new Date(),
    };
  }

  updateScore(homeScore: number, awayScore: number): void {
    if (!this.currentMatch) {
      throw new Error(NO_MATCH_ERROR);
    }

    if (homeScore < 0 || awayScore < 0) {
      throw new Error('Invalid score');
    }

    this.currentMatch.homeScore = Math.trunc(homeScore);
    this.currentMatch.awayScore = Math.trunc(awayScore);
  }

  finish(): void {
    if (!this.currentMatch) {
      throw new Error(NO_MATCH_ERROR);
    }

    this.score.push(this.currentMatch);
    this.currentMatch = null;
  }

  displayCurrentScore(): string {
    if (!this.currentMatch) {
      return 'There are no teams playing at the moment.';
    }

    const {homeName, homeScore, awayName, awayScore} = this.currentMatch;

    return `${homeName} ${homeScore} - ${awayScore} ${awayName}`;
  }

  getSummary() {
    if (this.score.length === 0) {
      return '';
    }
  }
}

export default Scoreboard;

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
    if (this.currentMatch !== null) {
      throw new Error('There is a match still in progress');
    }

    this.currentMatch = {
      homeName,
      homeScore: 0,
      awayName,
      awayScore: 0,
      created: new Date(),
    };
  }

  update(homeScore: number, awayScore: number): void {
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

  display(): string {
    if (!this.currentMatch) {
      return 'There are no teams playing at the moment.';
    }

    return this.getScoreForMatch(this.currentMatch);
  }

  private getScoreForMatch(match: Match): string {
    const {homeName, homeScore, awayName, awayScore} = match;
    return `${homeName} ${homeScore} - ${awayName} ${awayScore}`;
  }

  getSummary(): string {
    if (this.score.length === 0) {
      return '';
    }

    const sum = (numbers: number[]): number => numbers.reduce((a, b) => a + b, 0);

    // sort the scores by their sum of goals and most recent matches
    const summary = [...this.score];
    summary.sort((a, b) => {
      // optimization could be made to store the sum of goals in the database once the match has concluded
      const goalsA = sum([a.homeScore, a.awayScore]);
      const goalsB = sum([b.homeScore, b.awayScore]);
      const recent = b.created.getTime() - a.created.getTime();

      return goalsB - goalsA || recent;
    });

    return summary
      .map((match, index) => `${index + 1}. ${this.getScoreForMatch(match)}`)
      .join("\n");
  }
}

export default Scoreboard;

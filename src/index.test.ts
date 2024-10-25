import { describe, test, expect, beforeEach } from 'vitest';
import Scoreboard from './index';

describe('Scoreboard', () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  test('initializion without any errors', () => {
    expect(scoreboard).toBeDefined();
  });

  test('to have no initial matches at the beginning', () => {
    expect(scoreboard.score.length).toBe(0);
    expect(scoreboard.displayCurrentScore()).toBe('There are no teams playing at the moment.')
  });

  test('.add() to start a new match with 0-0 scoreline', () => {
    expect(scoreboard.score.length).toBe(0);
    scoreboard.start('Mexico', 'Canada');
    expect(scoreboard.score.length).toBe(1);
    expect(scoreboard.displayCurrentScore()).toBe('Mexico 0 - 0 Canada');
  });

  test('.updateScore to fail if there are no ongoing match', () => {
    expect(scoreboard.score.length).toBe(0);
    expect(() => scoreboard.updateScore(1, 2)).toThrow('No matches are currently in progress');
  });

  test('.updateScore to update the current score to 1-2 for home-away teams', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.updateScore(1, 2);
    expect(scoreboard.score.length).toBe(1);
    expect(scoreboard.displayCurrentScore()).toBe('Mexico 1 - 2 Canada');
  });

  test('.updateScore to throw an error if home score is a negative number', () => {
    scoreboard.start('Mexico', 'Canada');
    expect(() => scoreboard.updateScore(-1, 2)).toThrow('Invalid score');
  });

  test('.updateScore to throw an error if away score is a negative number', () => {
    scoreboard.start('Mexico', 'Canada');
    expect(() => scoreboard.updateScore(1, -2)).toThrow('Invalid score');
  });

  test('.updateScore to truncate any fractional digits if the provided scores are floating point numbers', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.updateScore(1.4, 2.6);
    expect(scoreboard.displayCurrentScore()).toBe('Mexico 1 - 2 Canada');
  })
});

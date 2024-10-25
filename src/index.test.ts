import { describe, test, expect, beforeEach, vi } from 'vitest';
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
    expect(scoreboard.display()).toBe('There are no teams playing at the moment.')
  });

  test('.add() to start a new match with 0-0 scoreline', () => {
    expect(scoreboard.score.length).toBe(0);
    scoreboard.start('Mexico', 'Canada');
    expect(scoreboard.score.length).toBe(0);
    expect(scoreboard.currentMatch).not.toBeNull();
    expect(scoreboard.display()).toBe('Mexico 0 - Canada 0');
  });

  test('.updateScore to fail if there are no ongoing match', () => {
    expect(scoreboard.score.length).toBe(0);
    expect(() => scoreboard.update(1, 2)).toThrow('No matches are currently in progress');
  });

  test('.updateScore to update the current score to 1-2 for home-away teams', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(1, 2);
    expect(scoreboard.score.length).toBe(0);
    expect(scoreboard.currentMatch).not.toBeNull();
    expect(scoreboard.display()).toBe('Mexico 1 - Canada 2');
  });

  test('.updateScore to throw an error if home score is a negative number', () => {
    scoreboard.start('Mexico', 'Canada');
    expect(() => scoreboard.update(-1, 2)).toThrow('Invalid score');
  });

  test('.updateScore to throw an error if away score is a negative number', () => {
    scoreboard.start('Mexico', 'Canada');
    expect(() => scoreboard.update(1, -2)).toThrow('Invalid score');
  });

  test('.updateScore to truncate any fractional digits if the provided scores are floating point numbers', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(1.4, 2.6);
    expect(scoreboard.display()).toBe('Mexico 1 - Canada 2');
  });

  test('.finish to throw an error if there is no ongoing matches', () => {
    expect(scoreboard.score.length).toBe(0);
    expect(() => scoreboard.finish()).toThrow('No matches are currently in progress');
  });

  test('.finish to finish up the ongoing match', () => {
    scoreboard.start('Mexico', 'Canada');
    expect(scoreboard.currentMatch).not.toBeNull();
    expect(scoreboard.display()).toBe('Mexico 0 - Canada 0');
    scoreboard.finish();
    expect(scoreboard.score.length).toBe(1);
    expect(scoreboard.currentMatch).toBeNull();
    expect(scoreboard.display()).toBe('There are no teams playing at the moment.');
  });

  test('.getSummary to return an empty string if no matches were played', () => {
    expect(scoreboard.getSummary()).toBe('');
  });

  test('.getSummary to display one team', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(1, 2);
    scoreboard.finish();
    expect(scoreboard.getSummary()).toBe('1. Mexico 1 - Canada 2');
  });

  test('.getSummary to display two teams ordered by the sum of goals', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(1, 2);
    scoreboard.finish();

    scoreboard.start('Spain', 'Brazil');
    scoreboard.update(10, 2);
    scoreboard.finish();
    expect(scoreboard.getSummary()).toBe(`1. Spain 10 - Brazil 2\n2. Mexico 1 - Canada 2`);
  });

  test('.getSummary to order teams by most recent if sum of goals are equal', () => {
    // make sure date is properly represented in the scores
    vi.useFakeTimers();
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(1, 2);
    scoreboard.finish();

    vi.advanceTimersByTime(1000);
    scoreboard.start('Spain', 'Brazil');
    scoreboard.update(10, 2);
    scoreboard.finish();

    vi.advanceTimersByTime(1000);
    scoreboard.start('Uruguay', 'Italy');
    scoreboard.update(6, 6);
    scoreboard.finish();

    expect(scoreboard.getSummary()).toBe(`1. Uruguay 6 - Italy 6\n2. Spain 10 - Brazil 2\n3. Mexico 1 - Canada 2`);

    // cleanup
    vi.useRealTimers();
  });

  test('.getSummary should not return currently live, ongoing match', () => {
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(1, 2);
    scoreboard.finish();

    scoreboard.start('Spain', 'Brazil');
    scoreboard.update(10, 2);

    expect(scoreboard.getSummary()).toBe('1. Mexico 1 - Canada 2');
  });

  test('.getSummary should display a complex table properly', () => {
    // make sure date is properly represented in the scores
    vi.useFakeTimers();
    scoreboard.start('Mexico', 'Canada');
    scoreboard.update(0, 5);
    scoreboard.finish();

    vi.advanceTimersByTime(1000);
    scoreboard.start('Spain', 'Brazil');
    scoreboard.update(10, 2);
    scoreboard.finish();

    vi.advanceTimersByTime(1000);
    scoreboard.start('Germany', 'France');
    scoreboard.update(2, 2);
    scoreboard.finish();

    vi.advanceTimersByTime(1000);
    scoreboard.start('Uruguay', 'Italy');
    scoreboard.update(6, 6);
    scoreboard.finish();

    vi.advanceTimersByTime(1000);
    scoreboard.start('Argentina', 'Australia');
    scoreboard.update(3, 1);
    scoreboard.finish();

    expect(scoreboard.getSummary()).toBe(
`1. Uruguay 6 - Italy 6
2. Spain 10 - Brazil 2
3. Mexico 0 - Canada 5
4. Argentina 3 - Australia 1
5. Germany 2 - France 2`
    );
  });
});

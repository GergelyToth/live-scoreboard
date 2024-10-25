import { describe, it, expect, beforeEach } from 'vitest';
import Scoreboard from './index';

describe('Scoreboard', () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  it('should initialize without any errors', () => {
    expect(scoreboard).toBeDefined();
  });

  it('should have no initial matches at the beginning', () => {
    expect(scoreboard.score.length).toBe(0);
    expect(scoreboard.displayCurrentMatch()).toBe('There are no teams playing at the moment.')
  });

  it('.add() should start a new match with 0-0 scoreline', () => {
    expect(scoreboard.score.length).toBe(0);
    scoreboard.start('Mexico', 'Canada');
    expect(scoreboard.score.length).toBe(1);
    expect(scoreboard.displayCurrentMatch()).toBe('Mexico 0 - 0 Canada');
  });
});

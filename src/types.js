/* @flow */

export type Score = {
  keys: string,
  lords: string,
  allies: string,
  monsters: string,
  nebulis?: string,
  leviathan?: string,
  wounds?: string,
};

type TotalScore = Score & {
  total: number,
};

export type Game = Array<{
  [player: string]: TotalScore,
}>;

export type Category =
  | 'keys'
  | 'lords'
  | 'allies'
  | 'monsters'
  | 'nebulis'
  | 'leviathan'
  | 'wounds';

export type GameData = {
  expKraken: boolean,
  expLeviathan: boolean,
  playersCount: number,
  players: Array<string>,
};

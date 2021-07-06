import { DocumentClient, getTableName } from '@backend/libs/db'
import { Table, Entity } from 'dynamodb-toolbox'


export enum GameRunState {
  CREATED = 'CREATED',
  LOADED = 'LOADED',
  STARTED = 'STARTED',
  ENDED = 'ENDED'
}

export interface GameRun {
  id: string;
  game_state: GameRunState;
  game_version: string;
  run_data: any;
  score: number;
  user_id: string;
  game_slug: string;
  training_id?: number;
  training_sequence?: number;
  updated_at?: string;
  created_at?: string;
  //  game_config: any;
  //  game_id: number;
  //  game_url_slug: string;
}

export const table = new Table({
  name: getTableName('nest_game_runs'),
  partitionKey: 'id',
  entityField: false,
  DocumentClient
})

const GameRunModel = new Entity<GameRun>({
  name: 'GameRun',
  modified: 'updated_at',
  created: 'created_at',
  attributes: {
    id: { partitionKey: true },
    user_id: { type: 'string' },
    game_state: { type: 'string' },
    game_slug: { type: 'string' },
    game_version: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    score: { type: 'number' },
    run_data: { type: 'map' }
  },
  table
})

export default GameRunModel

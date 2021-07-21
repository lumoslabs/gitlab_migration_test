import { DocumentClient, getTableName } from '@backend/libs/db'
import { Table, Entity } from 'dynamodb-toolbox'

export enum ConfigTypes {
  CATALOG = 'catalog',
  GAME = 'game',
  ONBOARDING = 'onboarding',
  TRAINING = 'training',
}

export interface Config {
  name: string;
  id: string;
  type: string;
  values: any
}

export interface CatalogConfig extends Config {
  values: {
    games: {
      version: string;
      slug: string;
    }[]
  }
}

export interface GameConfigVersion {
  id: string;
  overrides: {
    extras: Record<string, string | boolean>,
    game_url: string
  }
}

export interface FrontEndData {
  score_description_key: string;
  scores: {
    score_screen_score_key: string;
    screens: any;
    run_data_references: any;
  }[]
}

//two primary keys? lets use slug as primary key
export interface GameConfig extends Config {
  values: {
    id: number;
    slug: string;
    brain_area: string;
    continuous_match_configs: string[];
    frontend_data: FrontEndData;
    invoke_file: string;
    title: string;
    score_thumbnail_url: string;
    path: string;
    versions: GameConfigVersion[];
    banner_url: string;
    last_version: GameConfigVersion;
  }
}

export const table = new Table({
  name: getTableName('nest_configs'),
  partitionKey: 'id',
  sortKey: 'type',
  entityField: false,
  DocumentClient
})

const ConfigModel = new Entity<Config>({
  name: 'Config',
  attributes: {
    type: { sortKey: true },
    id: { partitionKey: true },
    name: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    values: { type: 'map' }
  },
  table
})

export default ConfigModel

import { DocumentClient, getTableName } from '@backend/libs/db'
import { Table, Entity } from 'dynamodb-toolbox'

export interface Config {
  name: string;
  created_at: string;
  id: string;
  type: string;
  updated_at: string;
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

export interface GameConfig extends Config {
  values: {
    brain_area: string;
    continuous_match_configs: string[];
    created_at: string;
    frontend_data: unknown;
    invoke_file: string;
    title: string;
    score_thumbnail_url: string;
    path: string;
    updated_at: string;
    versions: unknown;
    banner_url: string;
    id: number;
    slug: string;
  }
}

export const table = new Table({
  name: getTableName('nest_configs'),
  partitionKey: 'id',
  sortKey: 'type',
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

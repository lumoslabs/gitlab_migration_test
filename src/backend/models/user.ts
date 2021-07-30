import { DocumentClient, getTableName } from '@backend/libs/db'
import { Table, Entity } from 'dynamodb-toolbox'

export interface User {
  id: string;
  lumosity_access_token?: string;
  updated_at?: string;
  created_at?: string;
}

export const table = new Table({
  name: getTableName('nest_users'),
  partitionKey: 'id',
  entityField: false,
  DocumentClient
})

const UserModel = new Entity<User>({
  name: 'User',
  modified: 'updated_at',
  created: 'created_at',
  attributes: {
    id: { partitionKey: true },
    lumosity_access_token: { type: 'string' },
  },
  table
})

export default UserModel

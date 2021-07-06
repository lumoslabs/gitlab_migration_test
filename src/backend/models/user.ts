import { DocumentClient, getTableName } from '@backend/libs/db'
import { Table, Entity } from 'dynamodb-toolbox'

export interface User {
  id: string;
  oauth_access_token: string;
  profile: any;
  type: any;
  state: any;
  email: string;
  last_login_at: string;
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
  attributes: {
    id: { partitionKey: true },
  },
  table
})

export default UserModel

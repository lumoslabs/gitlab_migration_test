import DynamoDB from 'aws-sdk/clients/dynamodb';

import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

const client = new DynamoDB({
  region: serverRuntimeConfig.dynamodb.region,
  endpoint: serverRuntimeConfig.dynamodb.endpoint,
  sslEnabled: serverRuntimeConfig.dynamodb.sslEnabled
});

export default client

export const DocumentClient = new DynamoDB.DocumentClient({
  service: client
})

export const getTableName = (tablename: string) => {
  return serverRuntimeConfig.dynamodb.prefix + tablename
}

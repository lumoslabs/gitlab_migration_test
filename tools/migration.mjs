import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const env = dotenv.config({
  path: '.env.local'
})

if (!env.parsed?.DYNAMODB_LOCAL) {
  console.error('Works only with local dynamodb')
  process.exit(1)
}

const dynamodbPort = env.parsed?.DYNAMODB_PORT || 8002
const dynamodbPrefix = env.parsed?.DYNAMODB_PREFIX || 'dev_'

const dynamodb = new AWS.DynamoDB({
  region: process.env.DYNAMODB_REGION || 'local',
  endpoint: 'http://localhost:' + dynamodbPort,
});

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION || 'local',
  endpoint: 'http://localhost:' + dynamodbPort,
  service: dynamodb
});

const files = fs.readdirSync(path.join(process.cwd(), './tools/tables'))
const tables = (await dynamodb.listTables().promise()).TableNames

console.log(`------ MIGRATIONS`)

for (const fileName of files) {
  try {
    const schema = JSON.parse(fs.readFileSync(path.join(process.cwd(), './tools/tables/', fileName)))

    if (!schema?.TableName) {
      console.warn(`Skipped ${fileName} - TableName is required`)
      continue
    }

    const tableName = dynamodbPrefix + schema?.TableName
    schema.TableName = tableName

    if (tables && tables.includes(tableName)) {
      console.warn(`Skipped ${tableName} - already exists`)
      continue
    }

    await dynamodb.createTable(schema).promise()
    console.log(`Created ${tableName}`)

  } catch (e) {
    console.warn(`Skipped ${fileName} - ${e.message}`)
    continue;
  }

}

const seeds = fs.readdirSync(path.join(process.cwd(), './tools/seeds'))

console.log(`------ SEEDS`)

for (const seedName of seeds) {
  try {
    const TableName = dynamodbPrefix + seedName.slice(0, -5)
    console.log(`--- Seed into ${TableName}`)
    const rows = JSON.parse(fs.readFileSync(path.join(process.cwd(), './tools/seeds/', seedName)))
    for (const rowNumber in rows) {
      try {
        const row = rows[rowNumber]
        await documentClient.put({
          TableName,
          Item: row
        }).promise()
        console.log(`Put row #${rowNumber}`)

      } catch (e) {
        console.warn(`Skipped row ${JSON.stringify(rows[rowNumber])} - ${e.message}`)
      }
    }
  } catch (e) {
    console.warn(`Skipped ${seedName} - ${e.message}`)
  }
}

import AWS from 'aws-sdk'
import dynalite from 'dynalite'
import { createServer } from 'dynamodb-admin'
import dotenv from 'dotenv'

const env = dotenv.config({
  path: '.env.local'
})

if (!env.parsed?.DYNAMODB_LOCAL) {
  console.error('Works only with local dynamodb')
  process.exit(1)
}

const dynamodbPort = env.parsed?.DYNAMODB_PORT || 8002
const dynaliteServer = dynalite({ path: './dynalite_db', createTableMs: 50 })


dynaliteServer.listen(dynamodbPort, function (err) {
  if (err) throw err
  console.log(`Dynalite started on port ${dynamodbPort}`)

  const dynamodb = new AWS.DynamoDB({
    region: process.env.DYNAMODB_REGION || 'local',
    endpoint: 'http://localhost:' + dynamodbPort,
  })
  const dynClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb })
  const app = createServer(dynamodb, dynClient)

  const adminPort = env.parsed?.DYNAMODB_ADMIN_PORT || 8001
  const server = app.listen(adminPort)
  server.on('listening', () => {
    const address = server.address()
    console.log(`dynamodb-admin listening on http://0.0.0.0:${address.port}`)
  })

})

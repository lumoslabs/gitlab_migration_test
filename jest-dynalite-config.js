module.exports = {
  tables: [
    {
      "TableName": "test_nest_configs",
      "AttributeDefinitions": [
        {
          "AttributeName": "type",
          "AttributeType": "S"
        },
        {
          "AttributeName": "id",
          "AttributeType": "S"
        }
      ],
      "KeySchema": [
        {
          "AttributeName": "type",
          "KeyType": "HASH"
        },
        {
          "AttributeName": "id",
          "KeyType": "RANGE"
        }
      ],
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
      },
    },
    {
      "TableName": "test_nest_game_runs",
      "AttributeDefinitions": [
        {
          "AttributeName": "id",
          "AttributeType": "S"
        },
        {
          "AttributeName": "user_id",
          "AttributeType": "S"
        },
        {
          "AttributeName": "game_slug",
          "AttributeType": "S"
        },
        {
          "AttributeName": "created_at",
          "AttributeType": "S"
        },
        {
          "AttributeName": "score",
          "AttributeType": "N"
        }
      ],
      "KeySchema": [
        {
          "AttributeName": "id",
          "KeyType": "HASH"
        }
      ],
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
      },
      "GlobalSecondaryIndexes": [
        {
          "IndexName": "GameRunUserCreatedAtIndex",
          "KeySchema": [
            {
              "AttributeName": "user_id",
              "KeyType": "HASH"
            },
            {
              "AttributeName": "created_at",
              "KeyType": "RANGE"
            }
          ],
          "Projection": {
            "ProjectionType": "ALL"
          },
          "ProvisionedThroughput": {
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
          },
        },
        {
          "IndexName": "GameRunUserScoreIndex",
          "KeySchema": [
            {
              "AttributeName": "user_id",
              "KeyType": "HASH"
            },
            {
              "AttributeName": "score",
              "KeyType": "RANGE"
            }
          ],
          "Projection": {
            "ProjectionType": "ALL"
          },
          "ProvisionedThroughput": {
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
          },
        },
        {
          "IndexName": "GameRunUserIndex",
          "KeySchema": [
            {
              "AttributeName": "user_id",
              "KeyType": "HASH"
            }
          ],
          "Projection": {
            "ProjectionType": "ALL"
          },
          "ProvisionedThroughput": {
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
          },
        },
        {
          "IndexName": "GameRunGameSlugIndex",
          "KeySchema": [
            {
              "AttributeName": "game_slug",
              "KeyType": "HASH"
            }
          ],
          "Projection": {
            "ProjectionType": "ALL"
          },
          "ProvisionedThroughput": {
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
          },
        }
      ]
    }
  ],
  basePort: 8005,
};

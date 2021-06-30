module.exports = {
  tables: [
    {
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
      "TableName": "dev_nest_configs",
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
    }
  ],
  port: 8005,
};


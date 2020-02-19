// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk')

AWS.config.update({ region: "eu-central-1" });

let response; 

/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @param {Object} context
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.lambdaHandler = async (event, context) => {

    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08", region: "eu-central-1" });

    var tableParams = {

      AttributeDefinitions: [
        {
          AttributeName: 'slotPosition',
          AttributeType: 'N'
        },
        {
          AttributeName: 'imageFile',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'slotPosition',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'imageFile',
          KeyType: 'RANGE'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      TableName: 'TABLE_NAME',
      StreamSpecification: {
        StreamEnabled: false
      }

    };
  
    try {

      const dota = await ddb.createTable(tableParams).promise()
      console.log(dota);

      response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'hello world',
        })
      }
      return response


    } catch (err) {

      response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'There was an error creating new table...',
        })
      }
      return response

    }
  
};

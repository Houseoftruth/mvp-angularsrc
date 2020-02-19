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

    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

    const params = {
      TableName: "mvp-users",
      Item: {
        date: Date.now(),
        contact: "Richard Dawkins",
        restaurantname: "Brilliant Burritos",
        notables: 15
      }
    }
  
    try {

      const data = await documentClient.put(params).promise();
      console.log(data);

    } catch (err) {

      console.log(err);
      
    }

    return response
};

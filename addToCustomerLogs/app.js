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
        TableName: "mvpchatlog",
        Item: {
            date: Date.now(),
            message: "May i please have some more butter?"
        }
    }

    try {

        const data = await documentClient.put(params).promise();
        

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Log entry successfully saved...',
            })
        }
        return response


    } catch (err) {

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'There was an error adding new log entry...',
            'error': JSON.stringify(err)
            })
        }
        return response

    }
};

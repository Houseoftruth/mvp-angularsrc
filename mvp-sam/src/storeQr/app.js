// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk')

AWS.config.update({ region: "eu-central-1" });

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

    var s3 = new AWS.S3({ region: "eu-central-1", apiVersion: '2006-03-01' });
    var folder = "QR"
    var filename = "Qr#1"
    var bucketName = 'mvpqr'
    var keyName = getKeyName(folder, filename);
    var content = 'I Am Not Qr';
    var params = { Bucket: bucketName, Key: keyName, Body: content };

    try {

        var res = await s3.putObject(params, function (err, data) { }).promise();
        console.log('complete:', res);
        const response = {
            statusCode: 200,
            body: JSON.stringify('QR Code successfully saved...'),
        };
        return response;
    }
    catch (err) {

        const response = {
            statusCode: 200,
            body: JSON.stringify('There was an error saving QR Code...'),
        };
        return response;
    }
    function getKeyName(folder, filename) {
        return folder + '/' + filename;
    }

};

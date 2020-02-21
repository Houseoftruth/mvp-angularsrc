// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/'; 
let response; 
  @param {Object} event 
  @param {Object} context
  @returns {Object} 

  /** */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

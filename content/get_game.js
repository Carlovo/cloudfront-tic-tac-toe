var crypto = require('crypto');

function handler(event) {
  var position = Math.floor(Math.random() * 9)
  var start_state = "0".repeat(position) + "1" + "0".repeat(8 - position)

  var signature = crypto
    .createHmac('sha256', '${ signing_key }')
    .update(start_state)
    .digest('base64url')

  return {
    statusCode: 200,
    headers: {
      'cache-control': {
        'value': 'max-age=100'
      },
      'content-type': {
        'value': 'text/plain'
      }
    },
    body: start_state + "." + signature
  }
}

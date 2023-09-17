var crypto = require('crypto');

function _calculateDigest(data) {
  return crypto
    .createHmac('sha256', '${ signing_key }')
    .update(data)
    .digest('base64url')
}

function handler(event) {
  var position = Math.floor(Math.random() * 9)
  var computerState = '0'.repeat(position) + '1' + '0'.repeat(8 - position)

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
    body: computerState + '.' + _calculateDigest(computerState)
  }
}

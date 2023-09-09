var crypto = require('crypto');

function handler(event) {
  var gameState = event.request.querystring.gameState.value
  var playerMove = parseInt(event.request.querystring.playerMove.value)

  if (gameState.charAt(playerMove) == '0') {
    var playerState = gameState.substring(0, playerMove) + '2' + gameState.substring(playerMove + 1)
    var computerMove = playerState.indexOf('0')
    if (computerMove > -1) {
      var computerState = playerState.substring(0, computerMove) + '1' + playerState.substring(computerMove + 1)
    } else {
      var computerState = playerState
    }
  } else {
    var computerState = 'impossible'
  }

  var signature = crypto
    .createHmac('sha256', '${ signing_key }')
    .update(computerState)
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
    body: computerState + "." + signature
  }
}

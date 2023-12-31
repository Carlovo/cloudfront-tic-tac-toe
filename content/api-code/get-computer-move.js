var crypto = require('crypto');

// Function to ensure a constant time comparison to prevent timing side channels.
function _constantTimeEquals(a, b) {
  if (a.length == b.length) {
    var xor = 0;

    for (var i = 0; i < a.length; i++) {
      xor |= (a.charCodeAt(i) ^ b.charCodeAt(i))
    }

    return 0 === xor
  } else {
    return false
  }
}

function _calculateDigest(data) {
  return crypto
    .createHmac('sha256', '${ signing_key }')
    .update(data)
    .digest('base64url')
}

function _getPlayerState(gameState, playerMove) {
  return gameState.substring(0, playerMove) + '2' + gameState.substring(playerMove + 1)
}

function _getComputerState(playerState) {
  var computerMove = playerState.indexOf('0')
  return playerState.substring(0, computerMove) + '1' + playerState.substring(computerMove + 1)
}

function handler(event) {
  var querystring = event.request.querystring

  var gameState = querystring.gameState.value
  var playerMove = parseInt(querystring.playerMove.value)

  var computerState = (
    _constantTimeEquals(querystring.signature.value, _calculateDigest(gameState)) &&
    gameState.charAt(playerMove) == '0'
  ) ?
    _getComputerState(_getPlayerState(gameState, playerMove))
    :
    'foul'

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

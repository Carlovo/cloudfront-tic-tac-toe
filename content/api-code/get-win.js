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

function _didPlayerWin(playerState) {
  var row1 = playerState.substring(0, 3)
  var row2 = playerState.substring(3, 6)
  var row3 = playerState.substring(6, 9)
  var rows = [row1, row2, row3]

  // row
  if (rows.includes('222')) {
    return true
  }

  // column
  [0, 1, 2].forEach(index => {
    if (rows.every((row) => row.charAt(index) == '2')) {
      return true
    }
  })

  // diagonal
  if (row2.charAt(1) == '2') {
    if (
      (
        row1.charAt(0) == '2' &&
        row3.charAt(2) == '2'
      ) || (
        row1.charAt(2) == '2' &&
        row3.charAt(0) == '2'
      )
    ) {
      return true
    }
  }

  // player did not win
  return false
}

function handler(event) {
  var querystring = event.request.querystring

  var gameState = querystring.gameState.value
  var playerMove = parseInt(querystring.playerMove.value)

  var computerState = (
    _constantTimeEquals(querystring.signature.value, _calculateDigest(gameState)) &&
    gameState.charAt(playerMove) == '0' &&
    _didPlayerWin(_getPlayerState(gameState, playerMove))
  ) ?
    'win'
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

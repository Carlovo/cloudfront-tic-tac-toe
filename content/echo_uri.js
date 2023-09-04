function handler(event) {
  var request = event.request;
  var uri = request.uri;

  var content = `<\!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Echo uri</title>
  </head>
  <body>
    <p>uri: ${uri}</p>
  </body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      'cache-control': {
        'value': 'max-age=100'
      },
      'content-type': {
        'value': 'text/html'
      }
    },
    body: content
  }
}

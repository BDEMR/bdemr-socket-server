const request = require('request');

const send = (ws, uid, err, body) => {
  let message = {
    type: 'request-proxy--response',
    uid,
    err,
    response: body
  }
  message = JSON.stringify(message);
  ws.send(message);
}

exports.proxyRequest = (ws, { path, data, uid }) => {
  console.log('PROXY WS -> HTTP -> WS', path);
  let url = `http://localhost:8671/api/1${path}`;
  request.post(url, {
    json: data
  }, (err, httpResponse, body) => {
    if (!err) err = null;
    send(ws, uid, err, body);
  });
}

const fs = require('fs');
const https = require('https');
const http = require('http');
const WebSocket = require('ws');
const pathlib = require("path");
const userHomeDir = require('user-home');

const config = (() => {
  try {
    return JSON.parse(fs.readFileSync(pathlib.join(userHomeDir, "/bdemr-lite-config.json"), 'utf8'));
  } catch (ex) {
    return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  }
})();

const webServer = (() => {
  if (config.ssl.enabled) {
    return https.createServer({
      cert: fs.readFileSync(config.ssl.cert, 'utf8'),
      key: fs.readFileSync(config.ssl.key, 'utf8')
    });
  } else {
    return http.createServer();
  }
})();

const wss = new WebSocket.Server({ server: webServer });


wss.on('connection', (ws) => {

  ws.on('message', (message) => {
    console.log('received: %s', message);

  });

  ws.on('close', (code) => {

  });

  ws.on('error', (err) => {
    console.log(`ERR (socket)>`, err);
  });

});

wss.on('error', (err) => {
  console.log(`ERR (wss)>`, err);
})

webServer.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`(program)> server running on ${config.port}`);
});





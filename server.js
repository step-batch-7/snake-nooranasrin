const { Server } = require('net');
const { readFileSync } = require('fs');
const generateResponse = function(urlDetails) {
  const body = readFileSync(`.${urlDetails.fileName}`, 'utf8');
  return [
    `HTTP/1.1 200 OK`,
    'Server: myServer/0.1 nodeJs/12.0',
    `Content-type: text/${urlDetails.type}; charset=utf-8`,
    `Content-length: ${body.length}`,
    '',
    `${body}`,
    ''
  ].join('\n');
};
const getUrlDetails = function(requestedUrl) {
  let fileName = requestedUrl;
  if (requestedUrl === '/') {
    fileName = '/index.html';
  }
  const [, type] = fileName.split('.');
  return { type, fileName };
};
const handleRequest = function(text) {
  const [request] = text.split('\n');
  const [method, requestedUrl] = request.split(' ');
  if (method === 'GET') {
    const urlDetails = getUrlDetails(requestedUrl);
    return generateResponse(urlDetails);
  }
};
const onConnection = function(socket) {
  socket.setEncoding('utf8');
  socket.on('data', text => {
    handleRequest(text);
    socket.write(handleRequest(text));
  });
};
const main = function() {
  const server = new Server();
  server.on('connection', onConnection);
  server.on('listening', () => console.log('started listening'));
  server.listen(7000);
};
main();

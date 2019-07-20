const routeguide = require("./routeguide");
const grpc = require("grpc");

const {
  unaryChat,
  serverStream,
  clientStream,
  bidiChat
} = require("./methodHandlers");

function getServer() {
  var server = new grpc.Server();
  server.addService(routeguide.RouteGuide.service, {
    unaryChat,
    serverStream,
    clientStream,
    bidiChat
  });
  return server;
}

var routeServer = getServer();
routeServer.bind("0.0.0.0:3000", grpc.ServerCredentials.createInsecure());
routeServer.start();

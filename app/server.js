'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
  host: 'localhost',
  port: 8000,
  routes: { cors: true },
});

// Define the mocks
const mocks = ['navigation', 'user', 'plans'];

// Build the routes
const routes = mocks.map(i => {
  return {
    method: 'GET',
    path: `/${i}`,
    handler: function(request, h) {
      return h.file(`${__dirname}/mocks/${i}.json`);
    },
  };
});

server.route(routes);

// Start the server
async function start() {
  await server.register(require('inert'));
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
}

start();

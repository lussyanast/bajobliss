require('dotenv').config();

const Hapi = require('@hapi/hapi');

const routes = require('./routes/router');

const syncDatabase = require('./db/models/models');

const init = async () => {
  await syncDatabase();
  
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();

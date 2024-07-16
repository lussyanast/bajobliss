require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt')

const routes = require('./routes/router');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  
  await server.register(Jwt);
  server.auth.strategy('jwt', 'jwt', {
    // eslint-disable-next-line no-unused-vars
    validate: (decoded, request, h) => {
      return {
        isValid: true,
        credentials: decoded
      };
    },
    verify: {
      aud: false,
      iss: false,
      sub: false,
    },
    keys: process.env.JWT_SECRET,
  });

  server.route(routes);
  server.start();

  console.log('Environment:', process.env.NODE_ENV);
  console.log('Database:', process.env.DB_NAME);
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
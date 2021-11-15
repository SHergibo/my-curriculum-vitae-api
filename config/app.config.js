const Express = require('express'),
      Morgan = require('morgan'),
      Cors = require('cors'),
      Helmet = require('helmet'),
      Compression = require('compression'),
      mongoSanitize = require('express-mongo-sanitize'),
      Router = require('./../api/routes/v1'),
      Passport = require('passport'),
      Strategies = require('./passport.config'),
      ServiceErrorHandler = require('../api/services/error-handler.service'),
      hbs = require('express-hbs');

const { HTTPLogs, api, env, environments, CorsOrigin } = require('./environment.config');

const app = Express();

app.use('/assets', Express.static(`${process.cwd()}/api/public`));

app.engine('hbs', hbs.express4({
  defaultLayout: `${process.cwd()}/api/views/layouts/default-layout.hbs`
}));

app.set('views', `${process.cwd()}/api/views`);

app.set('view engine', 'hbs');

app.use(Helmet());

app.use(Compression());

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(Cors({
  origin: function (origin, callback) {
    if (CorsOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

app.use(Passport.initialize());

Passport.use('jwt', Strategies.jwt);

app.use(`/api/${api}`, Router);

app.use(Morgan(HTTPLogs));

if (env.toUpperCase() === environments.DEVELOPMENT) {
  app.use(ServiceErrorHandler.exit);
  app.use(ServiceErrorHandler.notFound);
} else {
  app.use(ServiceErrorHandler.log, ServiceErrorHandler.exit);
  app.use(ServiceErrorHandler.notFound);
}

module.exports = app;
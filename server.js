const express = require('express');

const morgan = require('morgan');
const clientSession = require('client-sessions');
const helmet = require('helmet');
const nunjucks = require('nunjucks');

const {SESSION_SECRET} = require('./config');

const app = express();
const pages = require('./src/pages');

app.use(express.static('public'));
app.use(morgan('short'));
app.use(express.urlencoded({extended: false}));
nunjucks.configure('src/views', {
  autoescape: true,
  express: app
});
app.use(
  clientSession({
    cookieName: 'session',
    secret: SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000
  })
);

app.use(helmet());

app.get('/', pages.initialisation);
app.post('/addConsumerKey', pages.addConsumerKey);
app.get('/authorize', pages.authorize);
app.get('/callback', pages.callback);

let server;
module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
    return app;
  },
  stop() {
    server.close();
  }
};

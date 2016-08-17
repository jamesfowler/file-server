'use strict';

const koa = require('koa');
const app = koa();

const koaLogger = require('koa-logger');
app.use(koaLogger());

const cors = require('koa-cors');
app.use(cors());

app.use(function* errorHandler(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.use(require('koa-file-server')({ root: './files' }));

const port = process.env.PORT || 9003;

if (!module.parent) app.listen(port);
console.log('info', `server running at http://127.0.0.1:${port}`);

module.exports = app;
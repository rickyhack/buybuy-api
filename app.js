const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
import bodyparser from 'koa-bodyparser'
import Session from 'koa-session'

const index = require('./routes/index')
import Config from './config/index.js'
import Routes from './routes/index.js'



app.keys = ['im a newer secret']

app.use(bodyparser())
app.use(convert(json()))
app.use(convert(logger()))
app.use(convert(Session(Config.session_config, app)))

router
  .use('/', Routes.Index())
  .use('/authenticate', Routes.Authenticate())
  .use('/api/user', Routes.User())

app.use(router.routes(), router.allowedMethods())

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
})

app.listen(3000, err => {
  if (err) logger.error('server error', err)

  console.info('Server listen to port 3000')
})


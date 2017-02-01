import Router from 'koa-router'

const routes = () => {
  const router = Router()

  router.get('/', function (ctx, next) {
    console.log(ctx.session.user)
    ctx.body = 'here'
  })

  return router.routes()
}

export default routes

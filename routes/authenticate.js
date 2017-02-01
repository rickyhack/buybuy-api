import Router from 'koa-router'
import Authenticate from '../middleware/authenticate.js'

const routes = () => {
  const router = Router()

  router.post('/signup', Authenticate.signup)

  router.post('/login', Authenticate.login)

  router.post('/logout', Authenticate.logout)

  return router.routes()
}

export default routes

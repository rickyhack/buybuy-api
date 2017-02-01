import Router from 'koa-router'

import Authenticate from './authenticate.js'
import User from './user.js'

const router = Router()

const Index = () => {
  router.get('/', (ctx, next) => {
    ctx.body = { Hello_World: 'Welcome to buybuy api' }
  })

  return router.routes()
}

// const IsLoggedIn = router.get('/', (ctx, next) => {
//   if (ctx.session.user) next()
//   else {
//     ctx.body = { logged_in: false } 
//   }
// })

export default {
  // IsLoggedIn,
  Index,
  Authenticate,
  User
}

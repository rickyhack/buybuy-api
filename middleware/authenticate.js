import R from 'ramda'
import Firebase from 'firebase'
import Config from '../config/index.js'

Firebase.initializeApp(Config.firebase)


const _setUser = (ctx, user) => {
  ctx.session.user = user
  ctx.body = {
    name           : user.displayName,
    email          : user.email,
    photo_url      : user.photoUrl,
    email_verified : user.emailVerified,
    uid            : user.uid
  }
}


const signup = async (ctx, next) => {
  const email = R.path(['request', 'body', 'email'])(ctx)
  const password = R.path(['request', 'body', 'password'])(ctx)
  
  await Firebase.auth()

    .createUserWithEmailAndPassword(email, password)

    .then( () => _setUser(ctx, Firebase.auth().currentUser) )

    .catch( e => {
      ctx.status = 400
      ctx.body = {
        message: e.message,
        code: e.code
      }
    })

}


const login = async (ctx, next) => {
  const email = R.path(['request', 'body', 'email'])(ctx)
  const password = R.path(['request', 'body', 'password'])(ctx)

  await Firebase.auth()

    .signInWithEmailAndPassword(email, password)

    .then( () => _setUser(ctx, Firebase.auth().currentUser) )

    .catch( e => {
      ctx.status = 400
      ctx.body = {
        message: e.message,
        code: e.code
      }
    })
    
}


const logout = (ctx, next) => {
  ctx.session = null
  ctx.status = 200
  ctx.body = {
    message: "Logout successfully"
  }
}


export default {
  signup,
  login,
  logout
}

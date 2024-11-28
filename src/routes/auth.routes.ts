import express from 'express'
import { loginController, registerController, logoutController } from '~/controllers/auth.controllers'
import { loginValidator, registerValidator, refreshTokenValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/util/handler'

const authRouters = express.Router()
/*  
    description: Login
    path: /auth/login,
    method: POST,
    body: { email: string, password: string }
*/
authRouters.post('/login', loginValidator, wrapRequestHandler(loginController))
/*  
    description: Register
    path: /auth/register,
    method: POST,
    body: { email: string, password: string, name: string, role: int (default: 0 (user)) }
*/
authRouters.post('/register', registerValidator, wrapRequestHandler(registerController))

/*  
    description: Logout
    path: /auth/logout,
    method: POST,
    body: { refreshToken: string }
*/
authRouters.post('/logout', refreshTokenValidator, wrapRequestHandler(logoutController))

export default authRouters

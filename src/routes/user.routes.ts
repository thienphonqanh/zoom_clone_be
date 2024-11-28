import { updateMeValidator } from '../middlewares/user.middlewares'
import express from 'express'
import { wrapRequestHandler } from '../util/handler'
import { getMeController, updateMeController } from '~/controllers/user.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'

const userRouters = express.Router()

/*  
    description: Get user profile
    path: /users/me,
    method: GET,
    body: { }
*/
userRouters.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))
/*  
    description: update user profile
    path: /users/me,
    method: PATCH,
    body: { name: string, phone: string, country: string, dob: Date(isoString) }
*/
userRouters.patch('/me', accessTokenValidator, updateMeValidator, wrapRequestHandler(updateMeController))

export default userRouters

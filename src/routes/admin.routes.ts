import express from 'express'
import {
  getAllUserController,
  createUserController,
  updateUserController,
  getOneUserController,
  deleteUserController,
  getAllRoomController,
  deleteRoomController
} from '~/controllers/admin.controllers'
import { checkRoomIdValidator, checkUserIdValidator, updateUserValidator } from '~/middlewares/admin.middlewares'
import { accessTokenValidator, registerValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/util/handler'

const adminRouters = express.Router()
/*  
    description: Get all users
    path: /admins/user,
    method: GET,
    body: { }
*/
adminRouters.get('/user', accessTokenValidator, wrapRequestHandler(getAllUserController))
/*  
    description: Get one user
    path: /admins/user/:id,
    method: GET,
    body: { }
*/
adminRouters.get('/user/:id', accessTokenValidator, checkUserIdValidator, wrapRequestHandler(getOneUserController))
/*  
    description: Add new user
    path: /admins/user,
    method: POST,
    body: { name: string, email: string, password: string, confirmPassword: string }
*/
adminRouters.post('/user', accessTokenValidator, registerValidator, wrapRequestHandler(createUserController))
/*  
    description: Update user
    path: /admins/user,
    method: PUT,
    body: { }
*/
adminRouters.put('/user', accessTokenValidator, updateUserValidator, wrapRequestHandler(updateUserController))
/*  
    description: Delete user
    path: /admins/user/:id,
    method: DELETE,
    params: { id: string }
*/
adminRouters.delete('/user/:id', accessTokenValidator, checkUserIdValidator, wrapRequestHandler(deleteUserController))
/*  
    description: Get all room
    path: /admins/rooms,
    method: GET,
    body: { }
*/
adminRouters.get('/room', accessTokenValidator, wrapRequestHandler(getAllRoomController))
/*  
    description: Delete room
    path: /admins/room/:id,
    method: DELETE,
    params: { id: string }
*/
adminRouters.delete('/room/:id', accessTokenValidator, checkRoomIdValidator, wrapRequestHandler(deleteRoomController))
export default adminRouters

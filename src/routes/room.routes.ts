import express from 'express'
import { wrapRequestHandler } from '../util/handler'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { checkRoomIdValidator } from '~/middlewares/room.middlewares'
import {
  checkRoomIdController,
  deleteRoomIdController,
  genStreamTokenController,
  getNewRoomIdController
} from '~/controllers/room.controllers'

const roomRouters = express.Router()
/*  
    description: Generate stream token for call (getStream library)
    path: /rooms/stream-token,
    method: GET,
    body: { }
*/
roomRouters.get('/stream-token', accessTokenValidator, wrapRequestHandler(genStreamTokenController))
/*  
    description: Get new room id
    path: /rooms/room,
    method: GET,
    body: { }
*/
roomRouters.get('/room', accessTokenValidator, wrapRequestHandler(getNewRoomIdController))
/*  
    description: Check if this room_id exists 
    path: /rooms/room,
    method: POST,
    body: { roomId: string }
*/
roomRouters.post('/room', accessTokenValidator, checkRoomIdValidator, wrapRequestHandler(checkRoomIdController))
/*  
    description: Delete roomId of user 
    path: /rooms/room,
    method: DELETE,
    body: { roomId: string }
*/
roomRouters.delete('/room', accessTokenValidator, checkRoomIdValidator, wrapRequestHandler(deleteRoomIdController))

export default roomRouters

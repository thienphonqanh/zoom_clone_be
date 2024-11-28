import { NextFunction, Request, Response } from 'express'
import roomServices from '~/services/room.services'

export const getNewRoomIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization
  const result = await roomServices.getNewRoomIdService(user_id)
  return res.status(200).json({ data: result })
}

export const checkRoomIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.body
  const result = await roomServices.checkRoomIdService(roomId)
  return res.status(200).json({ message: result })
}

export const deleteRoomIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.body
  const { user_id } = req.decoded_authorization
  const result = await roomServices.deleteRoomIdService(roomId, user_id)
  return res.status(200).json({ message: result })
}

export const genStreamTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization
  const result = await roomServices.genStreamTokenService(user_id)
  return res.status(200).json({ data: result })
}

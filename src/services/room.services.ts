import { StreamClient } from '@stream-io/node-sdk'
import { v4 as uuidv4 } from 'uuid'
import { ROOM_MESSAGES } from '~/constants/messages'
import { dataSource } from '~/dataSource'
import { Room } from '~/models/entity/room'
import { Users } from '~/models/entity/users'

class RoomServices {
  async getNewRoomIdService(userId: string) {
    const randomId: string = uuidv4()

    const toArray: string[] = randomId.split('-')
    const roomId: string = `${toArray[0]}-${toArray[1]}-${toArray[2]}`

    const user = await dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: userId })
      .getOne()
    const room = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values({
        name: roomId,
        user: user,
        is_active: false
      })
      .execute()
    return roomId
  }

  async checkRoomIdService(roomId: string) {
    const result = await dataSource
      .getRepository(Room)
      .createQueryBuilder('room')
      .where('room.name = :name', { name: roomId })
      .getOne()

    if (result) {
      return ROOM_MESSAGES.ROOM_ID_EXISTED
    }
  }

  async deleteRoomIdService(roomId: string, userId: string) {
    const result = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Room)
      .where('name = :name', { name: roomId })
      .andWhere('userId = :userId', { userId })
      .execute()

    return ROOM_MESSAGES.DELETE_ROOM_SUCCESS
  }

  async genStreamTokenService(user_id: string) {
    const apiKey = process.env.STREAM_API_KEY as string
    const apiSecret = process.env.STREAM_API_SECRET as string
    // Generate token có user_id, iat (default 1 hour), exp (default 1 hour)
    const streamClient = new StreamClient(apiKey, apiSecret)
    const token = streamClient.generateUserToken({ user_id })
    // Generate token có user_id không có iat, exp
    // const serverClient = StreamChat.getInstance(apiKey, apiSecret)
    // const token = serverClient.createToken(user_id)
    return token
  }
}
const roomServices = new RoomServices()
export default roomServices

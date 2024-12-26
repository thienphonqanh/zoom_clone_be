import { ADMIN_MESSAGES } from '~/constants/messages'
import { dataSource } from '~/dataSource'
import { Rooms } from '~/models/entity/rooms'
import { Users } from '~/models/entity/users'
import {
  CreateUserReqBody,
  DeleteRoomReqParams,
  DeleteUserReqParams,
  UpdateUserReqBody
} from '~/requests/admin.requests'
import { hashPassword } from '~/util/crypto'

class AdminServices {
  async getAllUser() {
    const result = await dataSource.getRepository(Users).createQueryBuilder('users').getMany()
    return result
  }

  async createUser(data: CreateUserReqBody) {
    const firstUser = await dataSource
      .getRepository(Users)
      .createQueryBuilder('users')
      .orderBy('users.id', 'DESC')
      .getOne()
    let newUserId: number = 0
    if (firstUser != null) {
      newUserId = (firstUser.id as number) + 1
    }
    const hashedPassword = hashPassword(data.password)
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([{ ...data, id: newUserId, password: hashedPassword }])
      .execute()
    return ADMIN_MESSAGES.CREATE_USER_SUCCESS
  }

  async updateUser(data: UpdateUserReqBody) {
    if (data.password) {
      data.password = hashPassword(data.password)
    }
    const { confirmPassword, ...updateData } = data
    await dataSource
      .createQueryBuilder()
      .update(Users)
      .set({ ...updateData })
      .where('id = :id', { id: data.id })
      .execute()
    return ADMIN_MESSAGES.UPDATE_USER_SUCCESS
  }

  async getOneUser(id: string) {
    const result = await dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne()
    return result
  }

  async deleteUser(data: DeleteUserReqParams) {
    await dataSource.createQueryBuilder().delete().from(Users).where('id = :id', { id: data.id }).execute()
    return ADMIN_MESSAGES.DELETE_USER_SUCCESS
  }

  async deleteRoom(data: DeleteRoomReqParams) {
    await dataSource.createQueryBuilder().delete().from(Rooms).where('id = :id', { id: data.id }).execute()
    return ADMIN_MESSAGES.DELETE_ROOM_SUCCESS
  }

  async getAllRoom() {
    const result = await dataSource.getRepository(Rooms).createQueryBuilder('rooms').getMany()
    return result
  }
}
const adminServices = new AdminServices()
export default adminServices

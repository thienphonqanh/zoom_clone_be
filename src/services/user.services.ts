import { USER_MESSAGES } from '~/constants/messages'
import { dataSource } from '~/dataSource'
import { Users } from '~/models/entity/users'

class UserServices {
  async getMeService(user_id: number) {
    const result = await dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .where('user.id = :user_id', { user_id })
      .getOne()
    return result
  }

  async updateMeService({
    country,
    dob,
    name,
    phone,
    id
  }: {
    country: string
    dob: Date
    name: string
    phone: string
    id: string
  }) {
    const result = await dataSource
      .createQueryBuilder()
      .update(Users)
      .set({ country, dob, name, phone })
      .where('id = :id', { id })
      .execute()
    return {
      message: USER_MESSAGES.UPDATE_ME_SUCCESS,
      result
    }
  }
}
const userServices = new UserServices()
export default userServices

import { TokenType, UserVerifyStatus } from '~/constants/enum'
import { dataSource } from '~/dataSource'
import { RefreshToken } from '~/models/entity/refreshToken'
import { Users } from '~/models/entity/users'
import { hashPassword } from '~/util/crypto'
import { signToken } from '~/util/jwt'

class AuthServices {
  private signAccessToken({
    user_id,
    user_name,
    verify
  }: {
    user_id: string
    user_name: string
    verify: UserVerifyStatus
  }) {
    return signToken({
      payload: {
        user_id,
        user_name,
        token_type: TokenType.AccessToken,
        verify
      },
      option: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
    })
  }

  private signRefreshToken({
    user_id,
    user_name,
    verify,
    remainingTime
  }: {
    user_id: string
    user_name: string
    verify: UserVerifyStatus
    remainingTime?: number
  }) {
    return signToken({
      payload: {
        user_id,
        user_name,
        token_type: TokenType.RefreshToken,
        verify
      },
      option: {
        expiresIn: remainingTime ?? process.env.REFRESH_TOKEN_EXPIRES_IN
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }

  private signAccessAndRefreshToken({
    user_id,
    user_name,
    verify
  }: {
    user_id: string
    user_name: string
    verify: UserVerifyStatus
  }) {
    return Promise.all([
      this.signAccessToken({ user_id, user_name, verify }),
      this.signRefreshToken({ user_id, user_name, verify })
    ])
  }

  async loginService({ id, name }: { id: number; name: string }) {
    const [[accessToken, refreshToken], oldRefreshToken] = await Promise.all([
      await this.signAccessAndRefreshToken({
        user_id: id.toString(),
        user_name: name.toString() as string,
        verify: UserVerifyStatus.Verrified
      }),
      await dataSource
        .getRepository(RefreshToken)
        .createQueryBuilder('refreshToken')
        .where('refreshToken.user = :userId', { userId: id })
        .getOne()
    ])
    if (oldRefreshToken) {
      await dataSource
        .createQueryBuilder()
        .update(RefreshToken)
        .set({
          token: refreshToken
        })
        .where('user = :userId', { userId: id })
        .execute()
    } else {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(RefreshToken)
        .values([{ user: id, token: refreshToken }])
        .execute()
    }
    return { accessToken, refreshToken }
  }

  async registerService({
    email,
    password,
    name,
    role
  }: {
    email: string
    password: string
    name: string
    role: number
  }) {
    const firstUser = await dataSource
      .getRepository(Users)
      .createQueryBuilder('users')
      .orderBy('users.id', 'DESC')
      .getOne()
    let newUserId: number = 0
    if (firstUser != null) {
      newUserId = (firstUser.id as number) + 1
    }
    const hashedPassword = hashPassword(password)
    const result = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([{ id: newUserId, email, password: hashedPassword, name, role }])
      .execute()
    return result
  }

  async logout(refreshToken: string) {
    const result = await dataSource
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('token = :token', { token: refreshToken })
      .execute()
    return result
  }

  async genNewAccessTokenService({
    remainingTimeRefreshToken,
    user_id,
    user_name
  }: {
    remainingTimeRefreshToken: number
    user_id: number
    user_name: string
  }) {
    const [refresh_token, access_token] = await Promise.all([
      this.signRefreshToken({
        user_id: user_id.toString(),
        user_name,
        verify: UserVerifyStatus.Verrified,
        remainingTime: remainingTimeRefreshToken
      }),
      this.signAccessToken({
        user_id: user_id.toString(),
        user_name,
        verify: UserVerifyStatus.Verrified
      })
    ])
    //replace old refresh token with new access token
    await dataSource
      .createQueryBuilder()
      .update(RefreshToken)
      .set({
        token: refresh_token
      })
      .where('userId = :userId', { userId: user_id })
      .execute()
    return { access_token, refresh_token }
  }
}
const authServices = new AuthServices()
export default authServices

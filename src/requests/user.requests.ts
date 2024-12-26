import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  email: string
  password: string
  name: string
  role: string
}

export interface UpdateMeReqBody {
  name: string
  country: string
  dob: Date
  phone: string
}

export interface LogoutReqBody {
  refreshToken: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  user_name: string
  token_type: TokenType
}

export enum UserVerifyStatus {
  Unverified,
  Verrified,
  Banned
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export enum ScheduleStatus {
  Scheduled = 'Scheduled',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

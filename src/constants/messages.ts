export const AUTH_MESSAGES = {
  PASSWORD_IS_REQUIRED: 'Mật khẩu không được để trống',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGIN_FAIL: 'Đăng nhập thất bại',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  REGISTER_FAIL: 'Đăng ký thất bại',
  USER_EXISTED: 'Người dùng đã tồn tại',
  NAME_IS_REQUIRED: 'Tên không được để trống',
  NAME_MUST_BE_STRING: 'Tên phải là chuỗi',
  NAME_LENGTH_MUST_BE_GREATER_THAN_5: 'Tên phải lớn hơn 5 ký tự',
  PASSWORD_MUST_BE_STRONG: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token không được để trống',
  ACCESS_TOKEN_IS_INVALID: 'Access token không hợp lệ',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token không hợp lệ',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token không được để trống',
  USED_REFRESH_TOKEN_OR_NOT_EXISTS: 'Refresh token đã được sử dụng hoặc không tồn tại',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  EMAIL_IS_INVALID: 'Email không hợp lệ',
  AUTHORIZATION_HEADER_IS_REQUIRED: 'Authorization header không được để trống',
  AUTHORIZATION_HEADER_IS_INVALID: 'Authorization header không hợp lệ'
} as const

export const USER_MESSAGES = {
  VALIDATION_ERROR: 'Lỗi xác thực',
  EMAIL_ALREADY_EXIST: 'Email đã tồn tại',
  EMAIL_IS_REQUIRED: 'Email không được để trống',
  USER_NOT_FOUND: 'Người dùng không tồn tại',
  PASSWORD_MUST_BE_A_STRING: 'Mật khẩu phải là chuỗi',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Mật khẩu phải từ 6 đến 50 ký tự',
  BIO_LENGTH_MUST_BE_FROM_1_TO_200: 'Bio phải từ 1 đến 200 ký tự',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Xác nhận mật khẩu không được để trống',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Xác nhận mật khẩu phải là chuỗi',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Xác nhận mật khẩu phải từ 6 đến 50 ký tự',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Xác nhận mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  CONFIRM_PASSWORD_IS_INVALID: 'Xác nhận mật khẩu không chính xác',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Ngày sinh phải đúng định dạng ISO8601',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email hoặc mật khẩu không chính xác',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token không được để trống',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email đã được xác thực trước đó',
  EMAIL_VERIFIED_SUCCESS: 'Xác thực email thành công',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Gửi lại email xác thực thành công',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Vui lòng kiểm tra email để reset mật khẩu',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token không được để trống',
  VERIFIED_FORGOT_PASSWORD_SUCCESS: 'Xác thực forgot password thành công',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password token không hợp lệ',
  RESET_PASSWORD_SUCCESS: 'Đặt lại mật khẩu thành công',
  GET_ME_SUCCESS: 'Lấy thông tin người dùng thành công',
  USER_NOT_VERIFIED: 'Người dùng chưa được xác thực',
  BIO_MUST_BE_STRING: 'Bio phải là chuỗi',
  LOCATION_MUST_BE_STRING: 'Location phải là chuỗi',
  LOCATION_LENGTH_MUST_BE_FROM_1_TO_200: 'Location phải từ 1 đến 200 ký tự',
  WEBSITE_MUST_BE_STRING: 'Website phải là chuỗi',
  WEBSITE_LENGTH_MUST_BE_FROM_1_TO_200: 'Website phải từ 1 đến 200 ký tự',
  USERNAME_MUST_BE_STRING: 'Username phải là chuỗi',
  USERNAME_IS_INVALID: 'Username không hợp lệ, chỉ chấp nhận chữ cái, số, dấu gạch dưới và dấu gạch ngang',
  USERNAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Username phải từ 1 đến 50 ký tự',
  AVATAR_MUST_BE_STRING: 'Avatar phải là chuỗi',
  AVATAR_LENGTH_MUST_BE_FROM_1_TO_50: 'Avatar phải từ 1 đến 50 ký tự',
  COVER_PHOTO_MUST_BE_STRING: 'Cover photo phải là chuỗi',
  COVER_PHOTO_LENGTH_MUST_BE_FROM_1_TO_50: 'Cover photo phải từ 1 đến 50 ký tự',
  UPDATE_ME_SUCCESS: 'Cập nhật thông tin người dùng thành công',
  INVALID_USER_ID: 'User id không hợp lệ',
  PHONE_MUST_BE_STRING: 'Phone phải là chuỗi',
  PHONE_LENGTH_MUST_BE_10: 'Phone phải có 10 ký tự'
} as const

export const ROOM_MESSAGES = {
  ROOM_ID_IS_REQUIRED: 'Room id không được để trống',
  ROOM_ID_MUST_BE_STRING: 'Room id phải là chuỗi',
  ROOM_ID_EXISTED: 'Phòng hợp lệ',
  ROOM_ID_NOT_EXISTED: 'Phòng không tồn tại',
  DELETE_ROOM_SUCCESS: 'Xóa phòng thành công',
  GET_ALL_ROOM_SUCCESS: 'Lấy phòng thành công'
} as const

export const SCHEDULE_MESSAGES = {
  GET_ALL_SCHEDULE_SUCCESS: 'Lấy tất cả lịch trình thành công',
  GET_SCHEDULE_SUCCESS: 'Lấy lịch trình thành công',
  CREATE_SCHEDULE_SUCCESS: 'Tạo lịch trình thành công',
  UPDATE_SCHEDULE_SUCCESS: 'Cập nhật lịch trình thành công',
  SCHEDULE_ID_NOT_EXISTED: 'Lịch trình không tồn tại',
  DELETE_SCHEDULE_SUCCESS: 'Xóa lịch trình thành công',
  SCHEDULE_ID_IS_REQUIRED: 'Lịch trình không được để trống',
  SCHEDULE_ID_IS_STRING: 'Lịch trình phải là chuỗi'
} as const

export const ADMIN_MESSAGES = {
  GET_ALL_USER_SUCCESS: 'Lấy tất cả người dùng thành công',
  CREATE_USER_SUCCESS: 'Tạo người dùng thành công',
  UPDATE_USER_SUCCESS: 'Cập nhật người dùng thành công',
  USER_ID_IS_REQUIRED: 'ID người dùng không được để trống',
  USER_ID_IS_STRING: 'ID người dùng phải là chuỗi',
  GET_USER_SUCCESS: 'Lấy người dùng thành công',
  DELETE_USER_SUCCESS: 'Xóa người dùng thành công',
  GET_ALL_ROOM_SUCCESS: 'Lấy tất cả phòng thành công',
  DELETE_ROOM_SUCCESS: 'Xóa phòng thành công'
} as const

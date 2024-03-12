//  각종 유틸리티 함수나 도구 함수를 제공하는 파일로, 다양한 유틸리티 기능을 제공하여 코드의 재사용성을 높이고 개발 효율성을 향상시키기 위한 공간

export function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password);
}

export function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

// Проверка наличия данных в поле ввода
export function isEmpty(value, message) {
  if (value) {
    return true;
  }

  return message;
}
// Проверка ввода имени пользователя
export function isValidUsername(value) {
  if (value && value.length <= 10) {
    return true;
  }

  return 'Username must be less than 10 characters';
}
// Проверка ввода пароля
export function isValidPassword(value) {
  if (value && value.length >= 8 && value.length <= 15) {
    return true;
  }

  return 'Password must be min 8 and max 15 characters';
}

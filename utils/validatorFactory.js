export function validatorFactory(validator, message) {
  return (value) => validator(value, message);
}

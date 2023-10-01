const INVALID_FIELD = 'O campo $property está inválido';
const INVALID_PASSWORD =
  'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial';
const INVALID_EMAIL = 'O email informado é inválido';
const EMPTY_EMAIL = 'O email deve ser informado';
const EMPTY_PASSWORD = 'A senha deve ser informada';
const EMPTY_NAME = 'O nome deve ser informado';
const EMAIL_ALREADY_IN_USE = 'Já existe um usuário cadastrado com este email';
const INVALID_CREDENTIALS = 'Email ou senha inválidos';
const INVALID_REFRESH_TOKEN = 'Refresh token inválido';
const VEHICLE_NOT_FOUND = 'Veículo não encontrado';
const UNAUTHORIZED = 'Não autorizado';
const FORBIDDEN = 'Você não tem permissão para acessar este recurso';
const VEHICLE_UPDATE_EMPTY_BODY = 'Nenhum campo foi informado para atualização';
const INVALID_ADICIONAL_INFORMATION =
  'O campo $property está inválido. Deve ser [{ "key": string, "value": string }, ...]';
const NO_MORE_VEHICLES = 'Não há mais veículos para serem exibidos';

export const ErrorHelper = {
  INVALID_FIELD,
  INVALID_PASSWORD,
  INVALID_EMAIL,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  EMPTY_NAME,
  EMAIL_ALREADY_IN_USE,
  INVALID_CREDENTIALS,
  INVALID_REFRESH_TOKEN,
  VEHICLE_NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
  VEHICLE_UPDATE_EMPTY_BODY,
  INVALID_ADICIONAL_INFORMATION,
  NO_MORE_VEHICLES,
};

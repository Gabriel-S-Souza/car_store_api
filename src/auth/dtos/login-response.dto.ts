import { UserResponseDTO } from './user-response.dto';

export interface LoginResponseDTO {
  user: UserResponseDTO;
  accessToken: string;
  refreshToken: string;
}

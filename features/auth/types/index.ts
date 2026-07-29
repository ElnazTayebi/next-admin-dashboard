export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface ApiErrorResponse {
  message: string;
}
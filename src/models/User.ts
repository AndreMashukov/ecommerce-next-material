export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  token?: string;
  refreshToken?: string;
  tokenTime?: string;
}

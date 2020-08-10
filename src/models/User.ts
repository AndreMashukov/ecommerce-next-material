export interface User {
  id?: string;
  email: string;
  phone: string;
  groupId?: number;
  firstName: string;
  lastName: string;
  password?: string;
  token?: string;
  refreshToken?: string;
  tokenTime?: string;
}

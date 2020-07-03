import axios from 'axios';
import { API_BASE } from '../constants';
import { User } from '../models';

export const changeUserName = async (
  id: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  const profile: Partial<User> = {
    id,
    firstName,
    lastName
  };
  const res = await axios.put(
    `${API_BASE}/profile/name`,
    profile,
    {}
  );
  const updatedUser = await res.data;
  return updatedUser;
};

export const changeUserPassword = async (
  id: string,
  password: string
): Promise<User> => {
  const res = await axios.put(
    `${API_BASE}/profile/password`,
    {
      id,
      password
    },
    {}
  );
  const updatedUser = await res.data;
  return updatedUser;
};

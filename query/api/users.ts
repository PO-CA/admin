import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllUsersWithOrderItemsQty = async () => {
  const result = await fetch(`${API_URL}/userswithorderitemsqty`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await result.json();

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const getUserDetailByUsersNickname = async (usersNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/users/${usersNickname}`,
  });
  return data;
};

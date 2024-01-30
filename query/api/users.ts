import { API_URL } from '@/constants/apis';
import axios from 'axios';

export const getAllUsersWithOrderItemsQty = async () => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/userswithorderitemsqty`,
  });
  return data;
};

export const getUserDetailByUsersNickname = async (usersNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/users/${usersNickname}`,
  });
  return data;
};

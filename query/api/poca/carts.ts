import { API_URL } from '@/constants/apis';
import { requests } from '@/query/request';

export const getUsersCart = async (usersId: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/cartsitems/${usersId}`,
  });
  console.log('asd');

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const addCartItems = async (payload: any) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/cartsitems`,
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const deleteCartItem = async (cartsitemsId: number) => {
  const { data } = await requests({
    method: 'delete',
    url: `${API_URL}/cartsitems/${cartsitemsId}`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const modifyCartItem = async (payload: any, cartsitemsId: number) => {
  const { data } = await requests({
    method: 'patch',
    url: `${API_URL}/cartsitems/${cartsitemsId}`,
    data: payload,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

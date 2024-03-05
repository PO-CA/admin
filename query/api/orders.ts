import { API_URL } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getAllPickedOrderByUsersEmail = async (usersEmail: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${usersEmail}/picked`,
  });

  return data;
};
export const getAllUnpickedOrderByUsersEmail = async (usersEmail: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${usersEmail}/unpicked`,
  });

  return data;
};

export const createAOrderItem = async (payload: object) => {
  const result = await fetch(`${API_URL}/logi/orderitems`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch orderitems');
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

export const putToPickOrderItem = async (orderIds: number[]) => {
  const result = await fetch(`${API_URL}/logi/orderitems/picked`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: orderIds }),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch orderitems');
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

export const putToUnPickOrderItem = async (orderIds: number[]) => {
  const result = await fetch(`${API_URL}/logi/orderitems/unpicked`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: orderIds }),
  });

  if (!result.ok) {
    throw new Error('Failed to fetch orderitems');
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

export const getAllOrderByUsersEmail = async (usersEmail: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${usersEmail}`,
  });

  return data;
};

export function useGetAllOrderByusersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['orderItems', `${usersEmail}`],
    queryFn: async () => {
      const data = await getAllOrderByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export const createOrderItemsInCart = async (userId: number | null) => {
  const data = await fetch(`${API_URL}/logi/orderitemsincart/${userId}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!data.ok) {
    throw new Error('Failed to fetch orderitems');
  }

  return data.json();
};

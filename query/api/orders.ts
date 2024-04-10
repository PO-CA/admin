import { API_URL } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { requests } from '../request';
import { CreateOrderItemDTO } from '@/types/createOrderItemDTO';

export const getAllPickedOrderByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${usersEmail}/picked`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};
export const getAllUnpickedOrderByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/logi/orderitems/${usersEmail}/unpicked`,
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }

  return data;
};

export const createAOrderItem = async (payload: object) => {
  const { data } = await requests(`${API_URL}/logi/orderitems`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(payload),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const putToPickOrderItem = async (orderIds: number[]) => {
  const { data } = await requests(`${API_URL}/logi/orderitems/picked`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ ids: orderIds }),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const putToUnPickOrderItem = async (orderIds: number[]) => {
  const { data } = await requests(`${API_URL}/logi/orderitems/unpicked`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ ids: orderIds }),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

export const putToCancelOrderItem = async (orderIds: number[]) => {
  const { data } = await requests(`${API_URL}/logi/orderitems/cancel`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ ids: orderIds }),
  });

  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  alert('주문 취소를 성공했습니다');

  return data;
};

export const getAllOrderByUsersEmail = async (usersEmail: string) => {
  const { data } = await requests({
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

export const createOrderItemsInCart = async (payload: CreateOrderItemDTO) => {
  const { data } = await requests(
    `${API_URL}/logi/orderitemsincart/${payload.userId}/${payload.addressId}`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const { errorMessage, errorCode, customMessage } = data;

  if (customMessage) {
    return alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
  } else if (errorMessage) {
    return alert(`${errorMessage}\n${errorCode}`);
  }
  return data;
};

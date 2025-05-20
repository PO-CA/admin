import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getBoards = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/board`,
  });
  return data;
};

export const getBoard = async (id: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/board/${id}`,
  });
  return data;
};

export const createBoard = async (payload: {
  title: string;
  content: string;
  visible: boolean;
}) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/board`,
    data: payload,
  });
  return data;
};

export const updateBoard = async (
  id: number,
  payload: { title: string; content: string; visible: boolean },
) => {
  const { data } = await requests({
    method: 'put',
    url: `${API_URL}/board/${id}`,
    data: payload,
  });
  return data;
};

export const deleteBoard = async (id: number) => {
  const { data } = await requests({
    method: 'delete',
    url: `${API_URL}/board/${id}`,
  });
  return data;
};

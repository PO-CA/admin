import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getNotices = async () => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/notice`,
  });
  return data;
};

export const getNotice = async (id: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/notice/${id}`,
  });
  return data;
};

export const createNotice = async (payload: {
  title: string;
  content: string;
  visible: boolean;
}) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/notice`,
    data: payload,
  });
  return data;
};

export const updateNotice = async (
  id: number,
  payload: { title: string; content: string; visible: boolean },
) => {
  const { data } = await requests({
    method: 'put',
    url: `${API_URL}/notice/${id}`,
    data: payload,
  });
  return data;
};

export const deleteNotice = async (id: number) => {
  const { data } = await requests({
    method: 'delete',
    url: `${API_URL}/notice/${id}`,
  });
  return data;
};

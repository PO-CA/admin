import { API_URL } from '@/constants/apis';
import { requests } from '../request';

export const getReleaseSchedules = async (year?: number, month?: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/api/release-schedules`,
    params: { year, month },
  });
  return data;
};

export const getReleaseSchedule = async (id: number) => {
  const { data } = await requests({
    method: 'get',
    url: `${API_URL}/api/release-schedules/${id}`,
  });
  return data;
};

export const createReleaseSchedule = async (payload: {
  date: string;
  content: string;
}) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/api/release-schedules`,
    data: payload,
  });
  return data;
};

export const updateReleaseSchedule = async (
  id: number,
  payload: { date: string; content: string },
) => {
  const { data } = await requests({
    method: 'put',
    url: `${API_URL}/api/release-schedules/${id}`,
    data: payload,
  });
  return data;
};

export const deleteReleaseSchedule = async (id: number) => {
  const { data } = await requests({
    method: 'delete',
    url: `${API_URL}/api/release-schedules/${id}`,
  });
  return data;
};

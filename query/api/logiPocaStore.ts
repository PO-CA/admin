import { API_URL } from '@/constants/apis';
import { PocaOrder, PocaOrderUserSummary } from '@/types/pocaOrder';
import { PocaShipping } from '@/types/pocaShipping';
import { PocaCreditLedger } from '@/types/pocaCredit';
import { AdjustPocaCreditDTO } from '@/types/adjustPocaCreditDTO';
import { CreatePocaShippingDTO } from '@/types/createPocaShippingDTO';
import { requests } from '../request';

const handleError = (data: any) => {
  const { errorMessage, errorCode, customMessage } = data ?? {};
  if (customMessage) {
    alert(`${errorMessage}\n${errorCode}\n${customMessage}`);
    return true;
  }
  if (errorMessage) {
    alert(`${errorMessage}\n${errorCode}`);
    return true;
  }
  return false;
};

export const getPocaOrderUsers = async (): Promise<PocaOrderUserSummary[]> => {
  const { data } = await requests({ method: 'get', url: `${API_URL}/logi/poca/orders/users` });
  if (handleError(data)) {
    return [];
  }
  return data ?? [];
};

export const getPocaOrdersByUser = async (usersEmail: string): Promise<PocaOrder[]> => {
  const { data } = await requests({ method: 'get', url: `${API_URL}/logi/poca/orders/users/${usersEmail}` });
  if (handleError(data)) {
    return [];
  }
  return data ?? [];
};

export const getPocaShippingsByUser = async (usersEmail: string): Promise<PocaShipping[]> => {
  const { data } = await requests({ method: 'get', url: `${API_URL}/logi/poca/shippings/users/${usersEmail}` });
  if (handleError(data)) {
    return [];
  }
  return data ?? [];
};

export const createPocaShipping = async (payload: CreatePocaShippingDTO): Promise<PocaShipping | null> => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/logi/poca/shippings`,
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });
  handleError(data);
  return data ?? null;
};

export const completePocaShipping = async (shippingId: number): Promise<PocaShipping | null> => {
  const { data } = await requests({
    method: 'put',
    url: `${API_URL}/logi/poca/shippings/${shippingId}/complete`,
  });
  handleError(data);
  return data ?? null;
};

export const getPocaCreditLedgerByUser = async (usersEmail: string): Promise<PocaCreditLedger[]> => {
  const { data } = await requests({ method: 'get', url: `${API_URL}/logi/poca/credits/users/${usersEmail}` });
  if (handleError(data)) {
    return [];
  }
  return data ?? [];
};

export const adjustPocaCredit = async (payload: AdjustPocaCreditDTO) => {
  const { data } = await requests({
    method: 'post',
    url: `${API_URL}/logi/poca/credits/adjust`,
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });
  handleError(data);
  return data;
};

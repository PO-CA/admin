import TableLoader from '@/components/tableLoader';
import {
  useCreateAAddressByUsersEmail,
  useUpdateAAddressByUsersEmail,
} from '@/query/query/address';
import React, { useEffect, useState } from 'react';

export default function Addresses({
  data,
  handleSelectChange,
  selectedOption,
  userEmail,
}: any) {
  const [selectedAddress, setSelectedAddress] = useState<any>({
    addressName: '',
    city: '',
    state: '',
    street: '',
    zipcode: '',
    receiverName: '',
    receiverPhoneNumber: '',
  });

  const [payload, setPayload] = useState({
    id: 0,
    addressName: '',
    city: '',
    state: '',
    street: '',
    zipcode: '',
    receiverName: '',
    receiverPhoneNumber: '',
  });

  const { mutateAsync } = useCreateAAddressByUsersEmail();
  const { mutateAsync: mutateAsyncUpdate } = useUpdateAAddressByUsersEmail();

  useEffect(() => {
    if (data)
      setSelectedAddress(
        data.find((address: any) => address.id === selectedOption),
      );
  }, [selectedOption, data]);

  useEffect(() => {
    setPayload({
      id: Number(selectedAddress?.id),
      addressName: selectedAddress?.addressName || '',
      city: selectedAddress?.city || '',
      state: selectedAddress?.state || '',
      street: selectedAddress?.street || '',
      zipcode: selectedAddress?.zipcode || '',
      receiverName: selectedAddress?.receiverName || '',
      receiverPhoneNumber: selectedAddress?.receiverPhoneNumber || '',
    });
  }, [selectedAddress, selectedOption]);

  if (!data) {
    return <TableLoader />;
  }

  return (
    <div>
      <div>
        <div>
          <div>배송지</div>
          <div>
            <button
              onClick={() => {
                mutateAsync(userEmail);
              }}
            >
              배송지 추가
            </button>
            <button
              onClick={() => {
                mutateAsyncUpdate(payload);
              }}
            >
              배송지 수정
            </button>
          </div>
        </div>
        {data && (
          <select id="address" onChange={handleSelectChange}>
            <option defaultChecked>배송지를 선택해주세요</option>
            {data.map((address: any) => (
              <option key={address.id} value={address.id}>
                {address.addressName}
              </option>
            ))}
          </select>
        )}
      </div>
      {selectedAddress ? (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>배송지명 : </div>
            <div>
              <input
                type="text"
                value={payload?.addressName || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    addressName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>주소 : </div>
            <div>
              <input
                type="text"
                value={payload?.city || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    city: e.target.value,
                  })
                }
              />{' '}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>군구 : </div>
            <div>
              <input
                type="text"
                value={payload?.state || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    state: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>상세 주소 : </div>
            <div>
              <input
                type="text"
                value={payload?.street || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    street: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>우편번호</div>
            <div>
              <input
                type="text"
                value={payload?.zipcode || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    zipcode: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>수령인</div>
            <div>
              <input
                type="text"
                value={payload?.receiverName || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    receiverName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px' }}>번호</div>
            <div>
              <input
                type="text"
                value={payload?.receiverPhoneNumber || ''}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    receiverPhoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      ) : (
        '배송지를 선택해 주세요'
      )}
    </div>
  );
}

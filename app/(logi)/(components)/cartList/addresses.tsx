import TableLoader from '@/components/tableLoader';
import React, { useEffect, useState } from 'react';

export default function Addresses({
  data,
  handleSelectChange,
  selectedOption,
}: any) {
  console.log('data', data);
  const [selectedAddress, setSelectedAddress] = useState<any>();

  useEffect(() => {
    if (data)
      setSelectedAddress(
        data.find((address: any) => address.id === selectedOption),
      );
  }, [selectedOption, data]);

  if (!data) {
    return <TableLoader />;
  }

  return (
    <div>
      <div>
        <div>배송지</div>
        {data && (
          <select id="address" onChange={handleSelectChange}>
            <option defaultChecked></option>
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
          <div>{selectedAddress?.addressName}</div>
          <div>{selectedAddress?.city}</div>
          <div>{selectedAddress?.state}</div>
          <div>{selectedAddress?.street}</div>
          <div>{selectedAddress?.zipcode}</div>
          <div>{selectedAddress?.receiverName}</div>
          <div>{selectedAddress?.receiverPhoneNumber}</div>
        </div>
      ) : (
        '배송지를 선택해 주세요'
      )}
    </div>
  );
}

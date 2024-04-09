import { useUpodateDcAmount } from '@/query/query/dc';
import React, { useEffect } from 'react';

export default function UpdateDcAmount({ info }: { info: any }) {
  const { mutateAsync } = useUpodateDcAmount();

  const [selectedNickname, setSelectedNickname] = React.useState<number>(
    info.getValue(),
  );

  useEffect(() => {
    if (info) {
      setSelectedNickname(info.getValue());
    }
  }, [info]);

  if (!info) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="number"
        value={selectedNickname}
        onChange={(e) => setSelectedNickname(Number(e.target.value))}
      />
      <div>
        <button
          onClick={() =>
            selectedNickname === null
              ? alert('할인액을 작성해 주세요')
              : mutateAsync({
                  id: info.row.original.id,
                  dcAmount: selectedNickname,
                })
          }
        >
          할인액 변경
        </button>
      </div>
    </div>
  );
}

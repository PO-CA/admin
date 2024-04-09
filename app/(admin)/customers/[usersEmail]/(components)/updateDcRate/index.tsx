import { useUpodateDcRate } from '@/query/query/dc';
import React, { useEffect } from 'react';

export default function UpdateDcRate({ info }: { info: any }) {
  const { mutateAsync } = useUpodateDcRate();

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
              ? alert('할인율을 작성해 주세요')
              : mutateAsync({
                  id: info.row.original.id,
                  dcRate: selectedNickname,
                })
          }
        >
          할인율 변경
        </button>
      </div>
    </div>
  );
}

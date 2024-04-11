'use client';
import { useCreateCreditByUsersEmail } from '@/query/query/credit';
import { CreateCreditByUsersEmailDTO } from '@/types/createCreditByUsersEmailDTO';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AddCredit() {
  const { mutateAsync: createCredit, isPending } =
    useCreateCreditByUsersEmail();
  const pathName = usePathname();

  const [addCredit, setAddCredit] = useState<CreateCreditByUsersEmailDTO>({
    usersEmail: pathName.replace('/orders/', ''),
    plus: 0,
    minus: 0,
    content: '',
    memo: '',
  });

  useEffect(() => {
    setAddCredit({
      ...addCredit,
      usersEmail: pathName.replace('/orders/', ''),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div style={{ textAlign: 'center' }}>내역(필수)</div>
        <input
          type="text"
          placeholder="내역"
          value={addCredit.content}
          style={{ width: '80px', height: '30px' }}
          onChange={(e) =>
            setAddCredit({
              ...addCredit,
              content: e.target.value,
            })
          }
        />
      </div>

      <div>
        <div style={{ textAlign: 'center' }}>-</div>
        <input
          type="number"
          value={addCredit.minus}
          style={{ width: '80px', height: '30px' }}
          onChange={(e) =>
            setAddCredit({
              ...addCredit,
              minus: Number(e.target.value),
            })
          }
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div>+</div>
        <input
          type="number"
          value={addCredit.plus}
          style={{ width: '80px', height: '30px' }}
          onChange={(e) =>
            setAddCredit({
              ...addCredit,
              plus: Number(e.target.value),
            })
          }
        />
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>메모</div>

        <input
          type="text"
          value={addCredit.memo}
          style={{ width: '80px', height: '30px' }}
          onChange={(e) =>
            setAddCredit({
              ...addCredit,
              memo: e.target.value,
            })
          }
        />
      </div>
      <button
        type="button"
        style={{ width: '40px' }}
        disabled={isPending}
        onClick={() => {
          if (addCredit.content.length < 1) {
            alert('내역를 입력해 주세요');
            return;
          } else {
            createCredit(addCredit).then(() =>
              setAddCredit({
                ...addCredit,
                memo: '',
                content: '',
                plus: 0,
                minus: 0,
              }),
            );
          }
        }}
      >
        크레딧 생성
      </button>
    </div>
  );
}

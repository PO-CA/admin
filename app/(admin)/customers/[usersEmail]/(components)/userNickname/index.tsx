import { useUpodateUsersNickname } from '@/query/query/users';
import React, { useEffect } from 'react';

export default function UserNickname({ usersData }: { usersData: any }) {
  const { mutateAsync } = useUpodateUsersNickname();

  const [selectedNickname, setSelectedNickname] = React.useState('');

  useEffect(() => {
    if (usersData) {
      setSelectedNickname(usersData.nickname);
    }
  }, [usersData]);

  if (!usersData) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      회사이름 :
      <input
        type="text"
        value={selectedNickname}
        onChange={(e) => setSelectedNickname(e.target.value)}
      />
      <div>
        <button
          onClick={() =>
            selectedNickname === ''
              ? alert('회사이름을 작성해 주세요')
              : mutateAsync({ id: usersData.id, nickname: selectedNickname })
          }
        >
          회사명 변경
        </button>
      </div>
    </div>
  );
}

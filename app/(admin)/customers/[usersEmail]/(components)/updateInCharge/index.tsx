import {
  useGetAllUsersWithOrderItemsQty,
  useUpodateUsersInCharge,
} from '@/query/query/users';
import React from 'react';

export default function UpdateInCharge({ usersData }: any) {
  const {
    data: usersList,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetAllUsersWithOrderItemsQty();

  const { mutateAsync } = useUpodateUsersInCharge();

  const [selectedNickname, setSelectedNickname] = React.useState<number | null>(
    null,
  );

  return (
    !isUsersLoading &&
    isUsersSuccess &&
    usersList && (
      <div style={{ display: 'flex' }}>
        담당자이름 :
        <div>
          <select onChange={(e) => setSelectedNickname(Number(e.target.value))}>
            <option value="">변경할 담당자선택</option>
            {usersList.map((item: any, i: number) => (
              <option key={i} value={item.id}>
                {item.nickname}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              selectedNickname === null
                ? alert('변경할 담당자를 선택해 주세요')
                : mutateAsync({
                    id: usersData.id,
                    inCharge: usersList.find(
                      (item: any) => item.id === selectedNickname,
                    ).nickname,
                  })
            }
          >
            권한 변경
          </button>
        </div>
      </div>
    )
  );
}

import { useUpodateUsersPermission } from '@/query/query/users';
import React from 'react';

export default function UserPermission({ usersData }: { usersData: any }) {
  const { mutateAsync } = useUpodateUsersPermission();

  const [selectedPermission, setSelectedPermission] = React.useState('');

  if (!usersData) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div>권한 : {usersData.userLevel}</div>
      <div>
        <select onChange={(e) => setSelectedPermission(e.target.value)}>
          <option value="">변경할 권한선택</option>
          <option value="ADMIN_1">ADMIN_1</option>
          <option value="ADMIN_2">ADMIN_2</option>
          <option value="STAFF_1">STAFF_1</option>
          <option value="STAFF_2">STAFF_2</option>
        </select>
        <button
          onClick={() =>
            selectedPermission === ''
              ? alert('권한을 선택해 주세요')
              : mutateAsync({ id: usersData.id, userLevel: selectedPermission })
          }
        >
          권한 변경
        </button>
      </div>
    </div>
  );
}

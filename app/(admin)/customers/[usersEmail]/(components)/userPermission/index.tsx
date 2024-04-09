import React from 'react';

export default function UserPermission({ usersData }: { usersData: any }) {
  console.log('usersData : ', usersData);

  if (!usersData) {
    return null;
  }

  return <div>{usersData.userLevel}</div>;
}

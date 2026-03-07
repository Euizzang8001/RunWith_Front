// 그룹 생성
export async function createGroup({
  groupName,
  token,
  groupNickname,
  groupCertificationCriteria,
  groupDescription,
  groupImageLink,
}: {
  groupName: string;
  token: string;
  groupNickname: string;
  groupCertificationCriteria: number;
  groupDescription: string;
  groupImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  if (groupImageLink) {
    formData.append('image', {
      uri: groupImageLink.uri,
      name: groupImageLink.fileName || 'group_image.jpg',
      type: groupImageLink.mimeType || 'image/jpe',
    } as any);
  }

  const data = {
    groupName,
    groupNickname,
    groupCertificationCriteria,
    groupDescription,
  };

  formData.append('request', {
    string: JSON.stringify(data),
    type: 'application/json',
  } as any);

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error(`그룹 생성 오류 : ${response.status}`);
  }

  return response.json();
}

// 그룹 조회
export async function getGroups(token: string, groupName: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups?groupName=${groupName}&offset=0&limit=20`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('그룹 목록 조회 오류');
  }
  return response.json();
}

// 그룹 삭제하기
export async function deleteGroup({
  groupId,
  token,
}: {
  groupId: string;
  token: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups/${groupId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const error = new Error('그룹 삭제 실패');
    (error as any).status = response.status;
    throw error;
  }
  return response.json();
}

//그룹 수정
export async function updateGroup({
  token,
  groupId,
  groupCertificationCriteria,
  groupDescription,
  groupImageLink,
}: {
  token: string;
  groupId: string;
  groupCertificationCriteria: number;
  groupDescription: string;
  groupImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  if (groupImageLink?.uri) {
    formData.append('image', {
      uri: groupImageLink.uri,
      name: groupImageLink.fileName || 'group_image.jpg',
      type: groupImageLink.mimeType || 'image/jpeg',
    } as any);
  }

  const data = {
    groupCertificationCriteria,
    groupDescription,
  };

  formData.append('request', {
    name: 'request',
    string: JSON.stringify(data),
    type: 'application/json',
  } as any);

  console.log('--- FormData Check ---');

  console.log('보내는 JSON 데이터:', JSON.stringify(data));
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups/${groupId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error(`그룹 수정 오류 : ${response.status}`);
  }

  const result = await response.json();
  console.log(result);
}

// 내 그룹 보기
export async function getSelfGroup({ token }: { token: string }) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups/self`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('내 그룹 조회 오류');
  }
  return response.json();
}

export async function createGroup({
  groupName,
  runnerId,
  groupNickname,
  groupCertificationCriteria,
  groupDescription,
  groupImageLink,
}: {
  groupName: string;
  runnerId: string;
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
    runnerId,
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
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error('그룹 생성 오류');
  }

  return response.json();
}

export async function getGroups() {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('그룹 목록 조회 오류');
  }
  return response.json();
}

export async function deleteGroup({
  groupId,
  runnerId,
}: {
  groupId: string;
  runnerId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups/groupId=${groupId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        runnerId: runnerId,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('그룹 삭제에 실패했습니다.');
  }
  return response.json();
}

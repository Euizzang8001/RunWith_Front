export async function createGroup({
  name,
  runnerId,
  nickname,
}: {
  name: string;
  runnerId?: number;
  nickname: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/groups/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, runnerId, nickname }),
    },
  );
  const errorBody = await response.text();
  console.log('서버 에러 응답:', errorBody);

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

// 그룹 가입하기
export async function joinGroup({
  token,
  groupId,
  runnerName,
  belongNickname,
  isLeader,
}: {
  token: string;
  groupId: string;
  runnerName: string;
  belongNickname: string;
  isLeader: boolean;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/belongs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token,
        groupId,
        runnerName,
        belongNickname,
        isLeader,
      }),
    },
  );
  if (!response.ok) {
    throw new Error('그룹 참여 에러');
  }
  return response.json();
}

// 그룹 탈퇴
export async function quitGroup({
  token,
  groupId,
}: {
  token: string;
  groupId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/belongs/groups/${groupId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('그룹 탈퇴 에러');
  }
  return response.json();
}

//리더 변경
export async function updateLeader({
  token,
  groupId,
  newLeaderRunnerId,
}: {
  token: string;
  groupId: string;
  newLeaderRunnerId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/belongs/leader`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newLeaderRunnerId, groupId }),
    },
  );

  if (!response.ok) {
    throw new Error('리더 변경 오류');
  }
  return response.json();
}

// 특정 그룹에 속한 모든 러너 조회
export async function getRunnerInGroups(groupId: string, token: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/belongs/groups/${groupId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('특정 그룹에 속한 모든 러너 조회 오류');
  }
  return response.json();
}

// 특정 러너가 속한 모든 그룹 조회
export async function getRunnerGroup({
  runnerId,
  token,
}: {
  runnerId: string;
  token: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/belongs/runners/${runnerId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('특정 러너가 속한 모든 그룹 조회 오류');
  }
  return response.json();
}

// 내가 속한 그룹 조회
export async function getMineGroups({ token }: { token: string }) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/belongs/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('내가 속한 그룹 조회 오류');
  }
  return response.json();
}

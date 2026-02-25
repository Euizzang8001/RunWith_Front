// 그룹 참여하기
export async function joinGroup({
  runnerId,
  groupId,
  runnerName,
  isLeader,
}: {
  runnerId: string;
  groupId: string;
  runnerName: string;
  isLeader: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/belongs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ runnerId, groupId, runnerName, isLeader }),
    },
  );
  if (!response.ok) {
    throw new Error('그룹 참여 에러');
  }
  return response.json();
}

// 특정 그룹에 속한 모든 러너 조회
export async function getGroupInRunner(groupId: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/belongs/groupId=${groupId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('특정 그룹에 속한 모든 러너 조회 오류');
  }
  return response.json();
}

// 특정 러너가 속한 모든 그룹 조회
export async function getMyJoinedGroups(ruunerId: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/belongs/runnerId=${ruunerId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('특정 러너가 속한 모든 그룹 조회 오류');
  }
  return response.json();
}

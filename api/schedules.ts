// 스케줄 조회
export async function getSchedules(token: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/schedules`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('스케줄 조회 오류');
  }
  return response.json();
}

// 스케줄 생성 (특정 러너가 특정 그룹에서의 일일 스케줄 생성)
export async function createSchedules({
  token,
  belongId,
  scheduleYear,
  scheduleMonth,
  scheduleDate,
  scheduleDescription,
}: {
  token: string;
  belongId: string;
  scheduleYear: number;
  scheduleMonth: number;
  scheduleDate: number;
  scheduleDescription: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/schedules`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        belongId,
        scheduleYear,
        scheduleMonth,
        scheduleDate,
        scheduleDescription,
      }),
    },
  );

  if (!response.ok) {
    console.log('스케줄 생성 오류 코드', response.status);
    throw new Error('스케줄 생성');
  }
  return response.json();
}

// 스케줄 삭제
export async function deleteSchedules({
  token,
  scheduleId,
}: {
  token: string;
  scheduleId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/schedules/${scheduleId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 401) {
    throw new Error('401');
  }
  if (!response.ok) {
    throw new Error('스케줄 삭제 오류');
  }
  return response.json();
}

// 스케줄 수정
export async function updateSchedules({
  token,
  scheduleId,
  scheduleDescription,
}: {
  token: string;
  scheduleId: string;
  scheduleDescription: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/schedules/${scheduleId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scheduleId,
        scheduleDescription,
      }),
    },
  );

  console.log('스케줄 수정 오류 코드', response.status);
  if (!response.ok) {
    throw new Error('스케줄 수정 오류');
  }
}

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

  console.log('스케줄 조회 오류 코드', response.status);
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
  schduleMonth,
  schduleDate,
  schduleDescription,
}: {
  token: string;
  belongId: string;
  scheduleYear: number;
  schduleMonth: number;
  schduleDate: number;
  schduleDescription: string;
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
        schduleMonth,
        schduleDate,
        schduleDescription,
      }),
    },
  );

  console.log('스케줄 생성 오류 코드', response.status);
  if (!response.ok) {
    throw new Error('스케줄 생성');
  }
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scheduleId,
      }),
    },
  );

  console.log('스케줄 생성 오류 코드', response.status);
  if (!response.ok) {
    throw new Error('스케줄 생성');
  }
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

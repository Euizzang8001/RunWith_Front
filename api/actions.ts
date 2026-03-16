// 액션 조회
export async function getActions({
  token,
  scheduleId,
}: {
  token: string;
  scheduleId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/actions?scheduleId=${scheduleId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('액션 조회 오류');
  }
  return response.json();
}

// 액션 생성
export async function createActions({
  token,
  scheduleId,
  actionName,
  actionDescription,
  actionStartHour,
  actionStartMinute,
  actionEndHour,
  actionEndMinute,
  actionImageLink,
}: {
  token: string;
  scheduleId: string;
  actionName: string;
  actionDescription: string;
  actionStartHour: number;
  actionStartMinute: number;
  actionEndHour: number;
  actionEndMinute: number;
  actionImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  if (actionImageLink) {
    formData.append('image', {
      uri: actionImageLink.uri,
      name: actionImageLink.fileName || 'group_image.jpg',
      type: actionImageLink.mimeType || 'image/jpeg',
    } as any);
  }

  const data = {
    scheduleId,
    actionName,
    actionDescription,
    actionStartHour,
    actionStartMinute,
    actionEndHour,
    actionEndMinute,
  };

  formData.append('request', {
    string: JSON.stringify(data),
    type: 'application/json',
  } as any);

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/actions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error(`액션 생성 오류 : ${response.status}`);
  }

  return response.json();
}

// 하나의 액션 상세 보기
export async function getActionsDetail({
  token,
  actionId,
}: {
  token: string;
  actionId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/actions/${actionId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('액션 상세보기 조회 오류 코드', response.status);
  if (!response.ok) {
    throw new Error('액션 상세보기 조회 오류');
  }
}

// 액션 삭제하기
export async function deleteActions({
  token,
  actionId,
}: {
  token: string;
  actionId: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/actions/${actionId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('액션 삭제 오류');
  }
  return response.json();
}

// 액션 수정하기
export async function updateActions({
  token,
  actionId,
  actionName,
  actionDescription,
  actionStartHour,
  actionStartMinute,
  actionEndHour,
  actionEndMinute,
  actionImageLink,
}: {
  token: string;
  actionId: string;
  actionName: string;
  actionDescription: string;
  actionStartHour: number;
  actionStartMinute: number;
  actionEndHour: number;
  actionEndMinute: number;
  actionImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  if (actionImageLink) {
    formData.append('image', {
      uri: actionImageLink.uri,
      name: actionImageLink.fileName || 'group_image.jpg',
      type: actionImageLink.mimeType || 'image/jpe',
    } as any);
  }

  const data = {
    actionId,
    actionName,
    actionDescription,
    actionStartHour,
    actionStartMinute,
    actionEndHour,
    actionEndMinute,
  };

  formData.append('request', {
    string: JSON.stringify(data),
    type: 'application/json',
  } as any);

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/actions/${actionId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (!response.ok) {
    throw new Error(`액션 수정 오류 : ${response.status}`);
  }

  return response.json();
}

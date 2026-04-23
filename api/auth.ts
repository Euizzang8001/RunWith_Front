// 러너 생성
export async function signUp({
  token,
  runnerName,
  runnerImageLink,
}: {
  token: string;
  runnerName: string;
  runnerImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  const signUpData = {
    runnerName,
  };

  formData.append('request', {
    string: JSON.stringify(signUpData),
    type: 'application/json',
  } as any);

  if (runnerImageLink) {
    formData.append('image', {
      uri: runnerImageLink.uri,
      name: runnerImageLink.fileName || 'profile.png',
      type: runnerImageLink.mimeType || 'image/png',
    } as any);
  }

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/runners`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (response.ok) {
    const text = await response.text();

    return text ? JSON.parse(text) : { success: true };
  }

  if (response.status === 409) {
    throw new Error('생성하고자 하는 데이터를 가진 러너들이 이미 존재합니다.');
  }

  if (!response.ok) {
    throw new Error('프로필 설정 실패');
  }

  return response.json();
}

export async function signOut() {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/runners/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('로그아웃 실패');
  }
  return response.json();
}

// 러너 존재 여부 확인
export async function getExistRunner(token: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/runners/me/exists`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'manual',
    },
  );

  if (response.ok) {
    const data = await response.json();
    return { ...data, isExist: true };
  }

  if (response.status === 302) {
    try {
      const data = await response.json();
      return { ...data, isExist: true };
    } catch {
      return { isExist: true };
    }
  }

  if (response.status === 404) {
    return { isExist: false };
  }

  throw new Error(`서버 오류 : ${response.status}`);
}

// 러너 조회
export async function getRunnersInfo({ token }: { token: string }) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/runners/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'manual',
    },
  );

  if (!response.ok) {
    throw new Error(`러너 정보 조회 오류 : ${response.status}`);
  }

  return response.json();
}

// 러너 수정
export async function updateRunnersInfo({
  token,
  runnerName,
  runnerImageLink,
}: {
  token: string;
  runnerName: string;
  runnerImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  formData.append('request', {
    name: 'request',
    string: JSON.stringify({ runnerName }),
    type: 'application/json',
  } as any);

  if (runnerImageLink?.uri) {
    formData.append('image', {
      uri: runnerImageLink.uri,
      name: runnerImageLink.fileName || 'profile.png',
      type: runnerImageLink.mimeType || 'image/png',
    } as any);
  }

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/runners/me`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  if (response.ok) {
    const text = await response.text();

    return text ? JSON.parse(text) : { success: true };
  }

  if (response.status === 409) {
    throw new Error('생성하고자 하는 데이터를 가진 러너들이 이미 존재합니다.');
  }

  if (!response.ok) {
    throw new Error('프로필 수정 실패');
  }

  return response.json();
}

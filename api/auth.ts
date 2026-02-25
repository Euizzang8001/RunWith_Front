export async function signUp({
  runnerEmail,
  runnerName,
  runnerPassword,
  runnerImageLink,
}: {
  runnerEmail: string;
  runnerName: string;
  runnerPassword: string;
  runnerImageLink?:
    | { uri: string; fileName?: string | null; mimeType?: string | null }
    | undefined;
}) {
  const formData = new FormData();

  const signUpData = {
    runnerEmail,
    runnerName,
    runnerPassword,
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
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/runners`,
    {
      method: 'POST',
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
    const errorDetail = await response.text();
    console.error('서버 응답 에러:', errorDetail);
    throw new Error('회원가입이 실패했습니다.');
  }

  return response.json();
}

export async function signInWithPassword({
  loginEmail,
  loginPassword,
}: {
  loginEmail: string;
  loginPassword: string;
}) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/runners/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginEmail, loginPassword }),
    },
  );

  if (!response.ok) {
    throw new Error('로그인 에러');
  }
  return response.json();
}

export async function signOut() {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_DEV_API_URL}/api/v1/runners/logout`,
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

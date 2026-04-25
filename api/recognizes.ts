import { authFetch } from './authfetch';

// 인정 api
export async function postRecognizes({
  scheduleId,
  recognizing,
  token,
}: {
  scheduleId: string;
  recognizing: boolean;
  token: string;
}) {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_PROD_API_URL}/api/v1/recognizes/${scheduleId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ scheduleId, recognizing }),
    },
  );
  if (!response.ok) {
    throw new Error(`인정 오류 : ${response.status}`);
  }
  return response.json();
}

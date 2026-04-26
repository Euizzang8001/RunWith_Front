import { useAuthStore } from '@/store/useAuthStore';
import { getAuth } from '@react-native-firebase/auth';

// 리프레쉬 토큰 갱신

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const headers = new Headers(options.headers);

  if (user) {
    const token = await user.getIdToken();
    headers.set('Authorization', `Bearer ${token}`);
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    useAuthStore.getState().actions.setLogOut();
    throw new Error('인증 세션 만료');
  }

  return response;
};

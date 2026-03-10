import { useAuthStore, useUserSession } from '@/store/useAuthStore';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import LoginScreen from './auth/signIn'; // LoginScreen 내부 어딘가에 GoogleLogin이 있음

export default function Index() {
  const router = useRouter();
  const userSession = useUserSession();
  const isLoaded = useAuthStore((state) => state.isLoaded);
  const auth = getAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // 1. 로그인은 됐는데 유저 정보(이름)가 있는 경우 -> 메인으로
      if (currentUser && userSession?.runnerName) {
        router.replace('/(tabs)');
      }
      // 2. 로그인은 됐는데 유저 정보(이름)가 없는 경우 -> 닉네임 설정으로
      else if (currentUser && !userSession?.runnerName) {
        router.replace('/auth/profileSetting');
      }
    });

    return () => unsubscribe();
  }, [userSession, isLoaded]); // 세션 정보가 바뀔 때마다 리다이렉트 여부 판단

  // 절대 null을 리턴하지 마세요.
  // 대신 로그인이 안 되어 있을 때만 LoginScreen을 보여줍니다.
  // userSession이 있더라도 router.replace가 완료되기 전까지는 화면을 유지해야 합니다.
  return <LoginScreen />;
}

import { useAuthStore, useUserSession } from '@/store/useAuthStore';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import LoginScreen from './auth/signIn';

export default function Index() {
  const router = useRouter();
  const userSession = useUserSession();
  const isLoaded = useAuthStore((state) => state.isLoaded);
  const auth = getAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      if (currentUser && userSession?.runnerName) {
        router.replace('/(tabs)');
      }
 
      else if (currentUser && !userSession?.runnerName) {
        router.replace('/auth/profileSetting');
      }
    });

    return () => unsubscribe();
  }, [userSession, isLoaded]); 

  return <LoginScreen />;
}

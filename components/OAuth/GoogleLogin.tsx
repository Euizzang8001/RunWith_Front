import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { useGetExistRunner } from '@/hooks/queries/use-get-exist-runner.data';
import { useGetRunnersInfo } from '@/hooks/queries/use-get-runners-info';
import { useAuthActions } from '@/store/useAuthStore';

import {
  signOut as firebaseSignOut,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

interface GoogleLoginProps {
  setIsLoading: (val: boolean) => void;
}

export default function GoogleLogin({ setIsLoading }: GoogleLoginProps) {
  const { setLogin } = useAuthActions();
  const router = useRouter();

  const [firebaseToken, setFirebaseToken] = useState<string | undefined>();

  const { data: runner } = useGetExistRunner(firebaseToken);
  const { data: runnerInfo } = useGetRunnersInfo(firebaseToken);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '221570016133-barlvpo8bvu8utpkh2k97tseudhpdf3e.apps.googleusercontent.com',
      iosClientId:
        '221570016133-b272m52e7sm8eua5j490leneliteg6h6.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    if (!firebaseToken || !runner) return;

    if (runner.isExist) {
      if (!runnerInfo) return;

      setLogin({ ...runnerInfo, token: firebaseToken });
      setIsLoading(false); // 로딩 상태
      router.replace('/(tabs)');
    } else {
      setIsLoading(false); // 로딩 상태
      router.replace('/auth/profileSetting');
    }
  }, [runner, runnerInfo, firebaseToken]);

  const onGoogleButtonPress = async () => {
    try {
      setIsLoading(true);

      await GoogleSignin.signOut().catch(() => {});

      const auth = getAuth();

      await firebaseSignOut(auth).catch(() => {});

      const { data } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(data?.idToken);

      const userCredential = await signInWithCredential(auth, googleCredential);

      if (userCredential.user) {
        const token = await getIdToken(userCredential.user, true);

        setFirebaseToken(token);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Pressable
      style={[styles.customButton, styles.googleButton]}
      onPress={onGoogleButtonPress}
    >
      <Image
        source={{
          uri: 'https://developers.google.com/identity/images/g-logo.png',
        }}
        style={styles.googleIcon}
      />
      <Text style={styles.googleText}>Google 계정으로 로그인</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  customButton: {
    width: 320,
    height: 50,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Pretendard-SemiBold',
  },
  appleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Pretendard-SemiBold',
  },
});

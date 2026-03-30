import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useGetExistRunner } from '@/hooks/queries/use-get-exist-runner.data';
import { useGetRunnersInfo } from '@/hooks/queries/use-get-runners-info';
import { useAuthActions } from '@/store/useAuthStore';

// 🔥 [수정 1] 기존의 'auth' 기본 임포트 대신, 모듈러 전용 함수들을 불러옵니다.
import {
  signOut as firebaseSignOut,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

export default function GoogleLogin() {
  const { setLogin } = useAuthActions();
  const router = useRouter();

  const [firebaseToken, setFirebaseToken] = useState<string | undefined>();

  const { data: runner, isError } = useGetExistRunner(firebaseToken);
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
    if (runner && firebaseToken) {
      if (runner.isExist) {
        console.log('러너 정보:', JSON.stringify(runnerInfo, null, 2));
        setLogin({ ...runnerInfo, token: firebaseToken });
        router.replace('/(tabs)');
      } else {
        router.replace('/auth/profileSetting');
      }
    }

    if (!firebaseToken) return;
  }, [runnerInfo, firebaseToken, runner]);

  const onGoogleButtonPress = async () => {
    try {
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
      console.error(error);
    }
  };

  return (
    <View style={styles.googleLogin}>
      <GoogleSigninButton
        style={{ width: 320, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  googleLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

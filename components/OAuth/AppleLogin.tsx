import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useGetExistRunner } from '@/hooks/queries/use-get-exist-runner.data';
import { useGetRunnersInfo } from '@/hooks/queries/use-get-runners-info';
import { useAuthActions } from '@/store/useAuthStore';

import {
  AppleAuthProvider,
  getAuth,
  getIdToken,
  signInWithCredential,
} from '@react-native-firebase/auth';

export default function AppleLogin() {
  const { setLogin } = useAuthActions();
  const router = useRouter();

  const [firebaseToken, setFirebaseToken] = useState<string | undefined>();
  const [isAvailable, setIsAvailable] = useState(false);

  const { data: runner } = useGetExistRunner(firebaseToken);
  const { data: runnerInfo } = useGetRunnersInfo(firebaseToken);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAvailable);
  }, []);

  useEffect(() => {
    if (!firebaseToken || !runner) return;

    if (runner.isExist) {
      if (!runnerInfo) return;

      console.log(
        '애플 로그인 러너 정보:',
        JSON.stringify(runnerInfo, null, 2),
      );
      setLogin({ ...runnerInfo, token: firebaseToken });
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/profileSetting');
    }
  }, [runner, runnerInfo, firebaseToken]);

  const onAppleButtonPress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const auth = getAuth();
        const appleCredential = AppleAuthProvider.credential(
          credential.identityToken,
        );

        const userCredential = await signInWithCredential(
          auth,
          appleCredential,
        );

        if (userCredential.user) {
          const token = await getIdToken(userCredential.user, true);
          setFirebaseToken(token);
          console.log('Apple Firebase Token:', token);
        }
      }
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
      } else {
        console.error('Apple Login Error:', e);
      }
    }
  };

  if (!isAvailable) return null;

  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={onAppleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 320,
    height: 48,
  },
});

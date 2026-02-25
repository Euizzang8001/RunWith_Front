import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import Loader from '@/components/Loader';
import GoogleLogin from '@/components/OAuth/GoogleLogin';
import { useSignInWithPassword } from '@/hooks/mutations/auth/use-sign-in-with-password';
import { useAuthActions } from '@/store/useAuthStore';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const { setLogin } = useAuthActions();

  const { mutate: signInWithPassword, isPending } = useSignInWithPassword({
    onSuccess: (data) => {
      console.log('로그인 응답:', data);
      Alert.alert('로그인 성공');
      setLogin(data);
      navigateHome();
    },
    onError: (error) => {
      Alert.alert('로그인 실패', error.message || '알 수 없는 오류');
      setLoginPassword('');
    },
  });

  const handleSignInWithPassword = () => {
    if (loginEmail.trim() === '') {
      Alert.alert('이메일을 입력해 주세요.');
      return;
    }
    if (loginEmail.trim() === '') {
      Alert.alert('비밀번호를 입력해 주세요.');
      return;
    }
    signInWithPassword({ loginEmail, loginPassword });
  };

  const navigateHome = () => {
    router.replace('/(tabs)');
  };

  const navigateSignUp = () => {
    router.push('/auth/signUp');
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.title}>
        <Text style={styles.font}>RunWith</Text>
      </View>

      <Loader visible={isPending} />

      <View style={{ flex: 1 }}>
        {/* 사용자 입력 폼 */}
        <View style={styles.container}>
          <InputField
            keyboardType="email-address"
            value={loginEmail}
            onChangeText={setLoginEmail}
            placeholder="이메일을 입력하세요."
          />
          <InputField
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry={true}
            placeholder="비밀번호를 입력하세요."
          />
        </View>

        <View style={styles.button}>
          <CustomButton
            label="로그인"
            size="large"
            variant="filled"
            textVariant="textFilled"
            onPress={handleSignInWithPassword}
          />
          <GoogleLogin />
          <CustomButton
            label="회원가입"
            size="large"
            variant="outline"
            textVariant="textOutline"
            onPress={navigateSignUp}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
  },
  title: {
    marginTop: 200,
    width: '100%',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'pretendard700',
    fontSize: 28,
  },
  button: {
    width: '100%',
    paddingBottom: 200,
    gap: 10,
  },
});

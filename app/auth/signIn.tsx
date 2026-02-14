import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { useSignInWithPassword } from '@/hooks/mutations/auth/use-sign-in-with-password';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onSuccess: () => {
        Alert.alert('로그인 성공');
        navigateHome();
      },
      onError: (error) => {
        Alert.alert('로그인 실패', error.message || '알 수 없는 오류');
        setPassword('');
      },
    });

  const handleSignInWithPassword = () => {
    console.log('버튼 클릭됨!', { email, password });
    if (email.trim() === '') return;
    if (password.trim() === '') return;
    signInWithPassword({ email, password });
  };

  const navigateHome = () => {
    router.replace('/(tabs)/group');
  };

  const navigateSignUp = () => {
    router.push('/auth/signUp');
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.title}>
        <Text style={styles.font}>RunWith</Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* 사용자 입력 폼 */}
        <View style={styles.container}>
          <InputField
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력하세요."
          />
          <InputField
            value={password}
            onChangeText={setPassword}
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

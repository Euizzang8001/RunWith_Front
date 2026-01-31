import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const navigateHome = () => {
    router.replace('/(tabs)');
  };

  const navigateSignUp = () => {
    router.push('/auth/signUp');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.title}>
        <Text style={styles.font}>RunWith</Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* 사용자 입력 폼 */}
        <View style={styles.container}>
          <InputField placeholder="이메일을 입력하세요." />
          <InputField placeholder="비밀번호를 입력하세요." />
        </View>

        <View style={styles.button}>
          <CustomButton
            label="로그인"
            size="large"
            variant="filled"
            textVariant="textFilled"
            onPress={navigateHome}
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

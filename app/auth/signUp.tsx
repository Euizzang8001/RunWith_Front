import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen() {
  const [runnerEmail, setRunnerEmail] = useState('');

  const navigateSignUpPassword = () => {
    if (runnerEmail.trim() === '') {
      Alert.alert('이메일을 입력해 주세요.');
      return;
    }

    router.push({ pathname: '/auth/signUpPassword', params: { runnerEmail } });
  };
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.font}>이메일 인증</Text>
      </View>

      <View style={styles.container}>
        <InputField
          value={runnerEmail}
          onChangeText={setRunnerEmail}
          placeholder="이메일을 입력하세요."
        />
        <View style={styles.emailAuthButton}>
          <CustomButton
            label="인증 요청"
            size="small"
            variant="outline"
            textVariant="textSmallOutLine"
          />
        </View>
        <InputField placeholder="인증 코드" />
      </View>
      <View style={styles.fixed}>
        <CustomButton
          label="확인"
          size="large"
          variant="filled"
          textVariant="textFilled"
          onPress={navigateSignUpPassword}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 10,
    paddingTop: 200,
  },
  title: {
    position: 'absolute',
    top: 100,
    width: '100%',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'pretendard700',
    fontSize: 18,
  },
  fixed: {
    position: 'absolute',
    width: '100%',
    bottom: 190,
    gap: 10,
  },
  emailAuthButton: {
    paddingBottom: 40,
    marginLeft: 25,
  },
});

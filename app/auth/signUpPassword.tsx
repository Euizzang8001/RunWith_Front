import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function signUpPassword() {
  const signUpSuccess = () => {
    router.replace('/auth/signIn');
  };
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.font}>회원가입</Text>
      </View>

      <View style={styles.container}>
        <InputField placeholder="닉네임을 입력해 주세요." />
        <InputField placeholder="비밀번호를 입력해 주세요." />
        <InputField placeholder="비밀번호를 다시 입력해 주세요." />
      </View>
      <View style={styles.fixed}>
        <CustomButton
          label="확인"
          size="large"
          variant="filled"
          textVariant="textFilled"
          onPress={signUpSuccess}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 50,
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
});

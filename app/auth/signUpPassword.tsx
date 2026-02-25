import CustomButton from '@/components/CustomButton';
import ImageViewer from '@/components/Image/ImageViewer';
import InputField from '@/components/InputField';
import Loader from '@/components/Loader';
import { useSignUp } from '@/hooks/mutations/auth/use-sign-up';
import { useAuthActions } from '@/store/useAuthStore';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SignUpPassword() {
  const { setLogin } = useAuthActions();

  const { runnerEmail } = useLocalSearchParams<{ runnerEmail: string }>();
  const [runnerName, setRunnerName] = useState('');
  const [runnerPassword, setRunnerPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >(undefined);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const defaultImage = require('@/assets/images/default-avatar.jpg');

  const { mutate: signUp, isPending } = useSignUp({
    onSuccess: (data) => {
      console.log('직접 확인 성공:', data);
      setLogin(data);
      Alert.alert('회원가입 성공');
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.log('에러 상세 내용:', error);
      Alert.alert('회원가입 실패', error.message);
      router.back();
    },
  });

  const handleSignUp = () => {
    if (!runnerEmail) {
      Alert.alert('이메일 정보가 없습니다.');
      return;
    }
    if (runnerPassword !== confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (runnerName.trim() === '') {
      Alert.alert('이름을 입력해 주세요.');
      return;
    }
    if (runnerPassword.trim() === '') {
      Alert.alert('비밀번호를 입력해 주세요.');
      return;
    }

    signUp({
      runnerEmail,
      runnerName,
      runnerPassword,
      runnerImageLink: selectedImage,
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <Loader visible={isPending} />
      <View style={styles.title}>
        <Text style={styles.font}>회원가입</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <Pressable onPress={pickImageAsync} style={styles.image_wrapper}>
          <View>
            <ImageViewer
              defaultImage={defaultImage}
              selectedImage={selectedImage?.uri}
            />
          </View>
        </Pressable>
        <View style={styles.input_group}>
          <InputField
            value={runnerName}
            onChangeText={setRunnerName}
            placeholder="닉네임을 입력해 주세요."
          />
          <InputField
            secureTextEntry
            value={runnerPassword}
            onChangeText={setRunnerPassword}
            placeholder="비밀번호를 입력해 주세요."
          />
          <InputField
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="비밀번호를 다시 입력해 주세요."
          />
        </View>
      </ScrollView>

      <View style={styles.fixed}>
        <CustomButton
          disabled={isPending}
          label="확인"
          size="large"
          variant="filled"
          textVariant="textFilled"
          onPress={handleSignUp}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 80,
  },
  container: {
    flex: 1,
    margin: 16,
    gap: 30,
    marginTop: 100,
  },

  image_wrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },

  title: {
    top: 20,
    width: '100%',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'pretendard700',
    fontSize: 18,
  },
  fixed: {
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 34 : 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  input_group: {
    gap: 30,
  },
});

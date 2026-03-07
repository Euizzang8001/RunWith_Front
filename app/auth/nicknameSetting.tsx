import CustomButton from '@/components/CustomButton';
import ImageViewer from '@/components/Image/ImageViewer';
import InputField from '@/components/InputField';
import Loader from '@/components/Loader';
import { useSignUp } from '@/hooks/mutations/auth/use-sign-up';
import { useUpdateRunnersInfo } from '@/hooks/mutations/runners/use-update-runners-info';
import { useAuthActions, useUserSession } from '@/store/useAuthStore';
import auth from '@react-native-firebase/auth';
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

export default function NicknameSetting() {
  const user = useUserSession();
  const { setLogin } = useAuthActions();

  const params = useLocalSearchParams<{
    mode?: string;
    prevRunnerNickname?: string;
    prevRunnerImageLink: string;
  }>();
  const isEditMode = params.mode === 'edit';

  const [runnerName, setRunnerName] = useState(params.prevRunnerNickname || '');
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
  const profileImage = selectedImage?.uri || params.prevRunnerImageLink;

  // 회원가입
  const { mutate: signUp, isPending } = useSignUp({
    onSuccess: (data) => {
      console.log('직접 확인 성공:', data);
      setLogin(data);
      Alert.alert('닉네임 설정 성공');
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.log('에러 상세 내용:', error);
      Alert.alert('닉네임 설정 실패', error.message);
      router.replace('/auth/signIn');
    },
  });

  // 러너 수정 뮤테이션
  const { mutate: updateRunner } = useUpdateRunnersInfo({
    onError: (error) => {
      Alert.alert('수정 실패', error.message);
    },
  });

  const handleSignUp = async () => {
    if (runnerName.trim() === '') {
      Alert.alert('닉네임을 입력해 주세요.');
      return;
    }

    try {
      const firebaseUser = await auth().currentUser;

      if (!firebaseUser) {
        Alert.alert('인증 정보가 만료되었습니다. 다시 로그인해 주세요.');
        router.replace('/auth/signIn');
        return;
      }

      const token = await firebaseUser.getIdToken(true);
      console.log(auth().currentUser);
      console.log('보내는 토큰:', token);
      console.log(typeof token);
      if (isEditMode) {
        updateRunner(
          {
            runnerName,
            runnerImageLink: selectedImage,
            token,
          },
          {
            onSuccess: (data) => {
              setLogin({
                token: token,
                ...data,
              });
              Alert.alert('수정 완료', '프로필이 변경되었습니다.');
              router.back();
            },
          },
        );
      } else {
        signUp({
          runnerName,
          runnerImageLink: selectedImage,
          token,
        });
      }
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <Loader visible={isPending} />
      <View style={styles.title}>
        <Text style={styles.font}>
          {isEditMode ? '내 정보 수정' : '내 정보 설정'}
        </Text>
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
              selectedImage={profileImage}
            />
          </View>
        </Pressable>
        <View style={styles.input_group}>
          <InputField
            value={runnerName}
            onChangeText={setRunnerName}
            placeholder="닉네임을 입력해 주세요."
          />
        </View>
      </ScrollView>

      <View style={styles.fixed}>
        <CustomButton
          disabled={isPending}
          label={isEditMode ? '수정' : '확인'}
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

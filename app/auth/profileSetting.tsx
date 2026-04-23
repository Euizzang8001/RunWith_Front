import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import Loader from '@/components/Loader';
import { ProfileImage } from '@/components/ProfileImage';
import { useSignUp } from '@/hooks/mutations/auth/use-sign-up';
import { useUpdateRunnersInfo } from '@/hooks/mutations/runners/use-update-runners-info';
import { useAuthActions } from '@/store/useAuthStore';
import { styles } from '@/styles/auth/profileSetting-styles';
import auth from '@react-native-firebase/auth';
import { useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function NicknameSetting() {
  const { setLogin } = useAuthActions();
  const queryClient = useQueryClient();

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

  // 회원가입
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      console.log('에러 상세 내용:', error);
      Alert.alert('닉네임 설정 실패', error.message);
      router.replace('/auth/signIn');
    },
  });

  const { mutate: updateRunner, isPending: isUpdateRunnerPending } =
    useUpdateRunnersInfo({
      onError: (error) => {
        Alert.alert('수정 실패', error.message);
      },
    });

  const isPending = isSignUpPending || isUpdateRunnerPending;

  const handleSignUp = async () => {
    if (runnerName.trim() === '') {
      Alert.alert('닉네임을 입력해 주세요.');
      return;
    }

    try {
      const firebaseUser = auth().currentUser;
      if (!firebaseUser) {
        Alert.alert('인증 정보가 만료되었습니다. 다시 로그인해 주세요.');
        router.replace('/auth/signIn');
        return;
      }

      const token = await firebaseUser.getIdToken(true);

      if (isEditMode) {
        updateRunner(
          { runnerName, runnerImageLink: selectedImage ?? undefined, token },
          {
            onSuccess: async (data) => {
              await queryClient.invalidateQueries({
                queryKey: ['runner-info'],
              });
              await queryClient.invalidateQueries({
                queryKey: ['mine-groups'],
              });

              setLogin({ token, ...data });
              Alert.alert('수정 완료', '프로필이 변경되었습니다.');
              router.back();
            },
          },
        );
      } else {
        signUp(
          { runnerName, runnerImageLink: selectedImage, token },
          {
            onSuccess: async (data) => {
              await queryClient.clear();

              setLogin({
                token: token,
                ...data,
              });

              Alert.alert('닉네임 설정 성공');
              router.replace('/(tabs)');
            },
          },
        );
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
            <ProfileImage
              uri={selectedImage?.uri || params.prevRunnerImageLink}
              size={80}
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

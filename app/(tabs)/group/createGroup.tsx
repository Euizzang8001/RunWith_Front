import ImageViewer from '@/components/Image/ImageViewer';
import InputField from '@/components/InputField';
import Loader from '@/components/Loader';
import { colors } from '@/constants';
import { useCreateGroup } from '@/hooks/mutations/group/use-create-group';
import { useUserSession } from '@/store/useAuthStore';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >(undefined);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const defaultImage = require('@/assets/images/default-avatar.jpg');

  const user = useUserSession();

  const groupNickname = 'test12345';

  const { mutate: createGroup, isPending } = useCreateGroup({
    onSuccess: () => {
      Alert.alert('그룹 생성 성공');
      router.push('/(tabs)/group');
    },
    onError: (error) => {
      console.error('에러:', error);
      alert('그룹 생성 오류: ' + error.message);
    },
  });

  const handleCreateGroup = () => {
    if (!user) {
      return;
    }

    if (groupName.trim() === '') {
      Alert.alert('그룹 명을 입력해 주세요.');
      return;
    }

    if (groupDescription.trim() === '') {
      Alert.alert('그룹 소개를 입력해 주세요.');
      return;
    }

    createGroup({
      groupName,
      runnerId: String(user.runnerId),
      groupNickname,
      groupCertificationCriteria: 3,
      groupDescription,
      groupImageLink: selectedImage,
    });
  };
  return (
    <SafeAreaView>
      <Loader visible={isPending} />
      <View style={styles.container_top}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>

        <Text style={styles.header}>새 그룹 만들기</Text>
        <Pressable>
          <Text>그룹 참여</Text>
        </Pressable>
        <View style={styles.right} />
      </View>

      <Pressable onPress={pickImageAsync} style={styles.image_wrapper}>
        <View>
          <ImageViewer
            defaultImage={defaultImage}
            selectedImage={selectedImage?.uri}
          />
        </View>
      </Pressable>

      <View style={styles.inputWrapper}>
        <InputField
          value={groupName}
          onChangeText={setGroupName}
          label="그룹 명"
          placeholder="그룹명을 입력해 주세요."
        />

        <InputField
          value={groupDescription}
          onChangeText={setGroupDescription}
          label="소개글"
          placeholder="그룹을 소개하는 문구를 입력해 주세요."
        />
      </View>

      <Pressable onPress={handleCreateGroup} style={styles.createButton}>
        <Text style={styles.createButtonText}>생성</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_top: {
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 50,
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard500',
    textAlign: 'center',
  },
  arrow_icon: {
    marginLeft: 5,
    width: 48,
    alignItems: 'center',
  },
  right: {
    width: 48,
  },
  inputWrapper: {
    marginTop: 20,
    gap: 30,
  },
  createButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'pretendard500',
    fontSize: 16,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
    padding: 20,
    borderRadius: 24,
  },
  image_wrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
});

import ImageViewer from '@/components/Image/ImageViewer';
import InputField from '@/components/InputField';
import Loader from '@/components/Loader';
import { useCreateGroup } from '@/hooks/mutations/group/use-create-group';
import { useUpdateGroup } from '@/hooks/mutations/group/use-update-groups';
import { useGetGroups } from '@/hooks/queries/group/use-get-group.data';
import { useAuthActions, useUserSession } from '@/store/useAuthStore';
import { GroupInfo } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../styles/group/createGroup-styles';

export default function CreateGroup() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const userSession = useUserSession();
  const { setLogin } = useAuthActions();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >(undefined);
  const { data: groups } = useGetGroups(userSession?.token || '', '');

  const groupItem = groups?.find((item: GroupInfo) => item.groupId === groupId);
  const mode = groupId ? 'edit' : 'create';

  useEffect(() => {
    if (mode === 'edit' && groupItem) {
      setGroupName(groupItem.groupName);
      setGroupDescription(groupItem.groupDescription);

      if (groupItem.groupImageLink) {
        setSelectedImage({ uri: groupItem.groupImageLink } as any);
      }
    }
  }, [groupItem, mode]);

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

  const groupNickname = 'test12345';

  const { mutate: updateGroup } = useUpdateGroup({
    onSuccess: () => {
      Alert.alert('성공', '그룹 수정이 성공했습니다.');
      router.back();
    },
    onError: (error) => {
      console.error('에러:', error);
      alert('그룹 수정 오류: ' + error.message);
    },
  });

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

  const handleCreateGroup = async () => {
    const user = auth().currentUser;
    const freshToken = await user?.getIdToken();
    if (!user) {
      return;
    }
    if (!freshToken) {
      Alert.alert('오류', '로그인 세션이 만료되었습니다.');
      return;
    }
    if (mode === 'create' && groupName.trim() === '') {
      Alert.alert('그룹 명을 입력해 주세요.');
      return;
    }

    if (groupDescription.trim() === '') {
      Alert.alert('그룹 소개를 입력해 주세요.');
      return;
    }

    if (mode === 'edit') {
      updateGroup({
        groupId: groupId!,
        token: freshToken,
        groupCertificationCriteria: 3,
        groupDescription,
        groupImageLink: selectedImage,
      });
    } else {
      createGroup(
        {
          groupName,
          token: freshToken,
          groupNickname,
          groupCertificationCriteria: 3,
          groupDescription,
          groupImageLink: selectedImage,
        },
        {
          onSuccess: () => {
            if (userSession) {
              setLogin({
                ...userSession,
                token: freshToken || '',
              });
            }
          },
        },
      );
    }
  };

  return (
    <SafeAreaView>
      <Loader visible={isPending} />
      <View style={styles.container_top}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>

        <Text style={styles.header}>
          {mode === 'edit' ? '그룹 수정하기' : '새 그룹 만들기'}
        </Text>
        <View style={styles.sideArea}>
          {mode === 'create' && (
            <Pressable
              onPress={() => router.push('/(tabs)/group/joinGroup')}
              style={styles.participate}
            >
              <Text>그룹 참여</Text>
            </Pressable>
          )}
        </View>
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
        {mode === 'create' && (
          <InputField
            value={groupName}
            onChangeText={setGroupName}
            label="그룹 명"
            placeholder="그룹명을 입력해 주세요."
          />
        )}

        <InputField
          value={groupDescription}
          onChangeText={setGroupDescription}
          label="소개글"
          placeholder="그룹을 소개하는 문구를 입력해 주세요."
        />
      </View>

      <Pressable onPress={handleCreateGroup} style={styles.createButton}>
        <Text style={styles.createButtonText}>
          {mode === 'edit' ? '수정' : '생성'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

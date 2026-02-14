import InputField from '@/components/InputField';
import { colors } from '@/constants';
import { useCreateGroup } from '@/hooks/mutations/group/use-create-group';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateGroup() {
  const [name, setName] = useState('');

  const nickname = 'testNickname';

  const { mutate: createGroup } = useCreateGroup({
    onSuccess: () => {
      Alert.alert('그룹 생성 성공');
      router.push('/(tabs)/group');
    },
    onError: (error) => {
      console.error('진짜 에러 원인:', error);
      alert('그룹 생성 오류: ' + error.message);
    },
  });

  const tempRunnerId = Math.floor(Math.random() * 1000000);

  return (
    <SafeAreaView>
      <View style={styles.container_top}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>

        <Text style={styles.header}>새 그룹 만들기</Text>

        <View style={styles.right} />
      </View>

      <View style={styles.inputWrapper}>
        <InputField
          value={name}
          onChangeText={setName}
          label="그룹 명"
          placeholder="그룹명을 입력해 주세요."
        />

        {/* <InputField
          value={description}
          onChangeText={setDescription}
          label="소개글"
          placeholder="그룹을 소개하는 문구를 입력해 주세요."
        /> */}
      </View>

      <Pressable
        onPress={() => {
          console.log('버튼클릭');
          createGroup({ name, runnerId: tempRunnerId, nickname });
        }}
        style={styles.createButton}
      >
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
    marginTop: 30,
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
});

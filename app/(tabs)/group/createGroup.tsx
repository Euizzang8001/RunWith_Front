import InputField from '@/components/InputField';
import { colors } from '@/constants';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateGroup() {
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
        <InputField label="그룹 명" placeholder="그룹명을 입력해 주세요." />

        <InputField
          label="소개글"
          placeholder="그룹을 소개하는 문구를 입력해 주세요."
        />
      </View>

      <Pressable style={styles.createButton}>
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
    paddingVertical: 300,
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

import { useDeleteGroup } from '@/hooks/mutations/group/use-delete-group';
import { useGetGroupInRunner } from '@/hooks/queries/use-get-group-in-runner.data';
import { useGetGroups } from '@/hooks/queries/use-get-group.data';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupOptions() {
  const { mutate: deleteGroup } = useDeleteGroup({
    onSuccess: () => {
      Alert.alert('그룹이 삭제되었습니다.');
      router.replace('/(tabs)/group');
    },
    onError: (error) => {
      Alert.alert('그룹 삭제를 실패했습니다.');
    },
  });
  const handleDeleteGroup = (groupId: string, runnerId: string) => {
    if (!groupId || !runnerId) {
      Alert.alert('오류', '삭제할 ID가 없습니다.');
      return;
    }
    Alert.alert(
      '그룹 삭제',
      '되돌릴 수 없습니다. 정말 그룹을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteGroup({ groupId, runnerId }),
        },
      ],
    );
  };
  const { groupId, runnerId } = useLocalSearchParams<{
    groupId: string;
    runnerId: string;
  }>();

  const { data: groups } = useGetGroups();

  const groupItem = groups?.find(
    (item: any) => String(item.groupId) === groupId,
  );
  const { data: runners } = useGetGroupInRunner(groupId);

  const currentCount = runners?.length;

  return (
    <SafeAreaView>
      <View>
        <Image
          source={{ uri: groupItem?.groupImageLink || undefined }}
          style={styles.groupImage}
        />
        <Text>{groupItem?.groupName}</Text>
        <Text>{groupItem?.groupDescription}</Text>
        <Text>현재 인원 {currentCount}명</Text>
      </View>
      <Pressable onPress={() => handleDeleteGroup(groupId, runnerId)}>
        <Text>그룹 삭제하기</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});

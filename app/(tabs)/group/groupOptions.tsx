import { dummyGroups } from '@/mocks/groups';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupOptions() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const group = dummyGroups.find((item) => String(item.id) === groupId);

  const currentCount = group?.participants.length;

  return (
    <SafeAreaView>
      <View>
        <Text>{group?.name}</Text>
        <Text>{currentCount}</Text>
      </View>
    </SafeAreaView>
  );
}

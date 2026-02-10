import { dummyGroups } from '@/mocks/groups';
import { FlatList } from 'react-native';
import GroupItem from './GroupItem';

export default function GroupList() {
  return (
    <FlatList
      data={dummyGroups}
      renderItem={({ item }) => <GroupItem group={item} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

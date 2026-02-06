import { FlatList } from 'react-native';
import GroupItem from './GroupItem';

const dummyDate = [
  { id: 1, participants: 5, capacity: 10, title: '수학 공부' },
  { id: 2, participants: 2, capacity: 10, title: '운동' },
];

export default function GroupList() {
  return (
    <FlatList
      data={dummyDate}
      renderItem={({ item }) => <GroupItem group={item} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

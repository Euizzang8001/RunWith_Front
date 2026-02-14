import { useGetGroups } from '@/hooks/queries/use-get-group';
import { FlatList } from 'react-native';
import GroupItem from './GroupItem';

export default function GroupList() {
  const { data: getGroups = [] } = useGetGroups();

  return (
    <FlatList
      data={getGroups}
      renderItem={({ item }) => <GroupItem group={item} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

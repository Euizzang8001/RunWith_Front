import { useGetMyJoinedGroups } from '@/hooks/queries/use-get-my-joined-groups.data';
import { useUserSession } from '@/store/useAuthStore';
import { GroupInfo } from '@/types';
import { FlatList } from 'react-native';
import GroupItem from './GroupItem';

export default function GroupList() {
  const user = useUserSession();

  const { data: joinedGroups = [] } = useGetMyJoinedGroups(
    user?.runnerId || '',
  );

  const myGroups = joinedGroups.map((group: GroupInfo) => ({
    groupId: group.groupId,
    groupName: group.groupName,
    groupDescription: group.groupDescription,
    groupImageLink: group.groupImageLink,
  }));

  return (
    <FlatList
      data={myGroups}
      renderItem={({ item }) => <GroupItem group={item} />}
      keyExtractor={(item) => String(item.groupId)}
      refreshing={false}
    />
  );
}

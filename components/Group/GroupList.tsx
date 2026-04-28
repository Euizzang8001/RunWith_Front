import { useGetMineGroups } from '@/hooks/queries/group/use-get-mine-groups.data';
import { useGetSelfGroup } from '@/hooks/queries/group/use-get-self-group.data';
import { useUserSession } from '@/store/useAuthStore';
import { GroupInfo } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import GroupItem from './GroupItem';

export default function GroupList() {
  const user = useUserSession();
  const { data: joinedGroups = [], refetch: refetchJoinedGroups } =
    useGetMineGroups(user?.token || '');
  const { data: selfGroup, refetch: refetchSelfGroup } = useGetSelfGroup(
    user?.token || '',
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([refetchJoinedGroups(), refetchSelfGroup()]);
    setIsRefreshing(false);
  }, [refetchJoinedGroups, refetchSelfGroup]);

  const Groups = useMemo(() => {
    const myGroups = selfGroup
      ? Array.isArray(selfGroup)
        ? selfGroup
        : [selfGroup]
      : [];

    const allGroups = [...myGroups, ...joinedGroups];

    return allGroups.map((group: GroupInfo) => ({
      groupId: group.groupId,
      belongId: group.belongId,
      groupName: group.groupName,
      groupDescription: group.groupDescription,
      groupImageLink: group.groupImageLink,
      token: group.token,
    }));
  }, [joinedGroups, selfGroup]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Groups}
        renderItem={({ item }) => <GroupItem group={item} />}
        keyExtractor={(item) => String(item.groupId)}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

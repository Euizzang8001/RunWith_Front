import { useGetSelfGroup } from '@/hooks/queries/group/use-get-mine-group.data';
import { useGetMineGroups } from '@/hooks/queries/group/use-get-mine-groups.data';
import { useUserSession } from '@/store/useAuthStore';
import { GroupInfo } from '@/types';
import { useMemo } from 'react';
import { FlatList } from 'react-native';
import GroupItem from './GroupItem';

export default function GroupList() {
  const user = useUserSession();
  const { data: joinedGroups = [] } = useGetMineGroups(user?.token || '');
  const { data: selfGroup } = useGetSelfGroup(user?.token || '');

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
    <FlatList
      data={Groups}
      renderItem={({ item }) => <GroupItem group={item} />}
      keyExtractor={(item) => String(item.groupId)}
      refreshing={false}
    />
  );
}

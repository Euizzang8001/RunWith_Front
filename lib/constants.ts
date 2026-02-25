export const QUERY_KEYS = {
  group: {
    all: ['group'],
    list: ['group', 'list'],
    groupList: (groupId: string) => ['group', 'list', groupId],
    runnersList: (groupId: string) => ['group', 'runners', groupId],
    joinedGroups: (runnerId: string) => ['group', 'joined', runnerId],
  },
};

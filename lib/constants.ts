export const QUERY_KEYS = {
  group: {
    all: ['group'],
    list: ['group', 'list'],
    groupList: (groupId: number) => ['group', 'list', groupId],
  },
};

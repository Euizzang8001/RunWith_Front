export const QUERY_KEYS = {
  group: {
    all: ['group'],
    list: ['group', 'list'],
    groupList: (groupId: string) => ['group', 'list', groupId],
    runnersList: (groupId: string) => ['group', 'runners', groupId],
    joinedGroups: (token: string, runnerId?: string) => [
      'group',
      'list',
      'joined',
      token,
      runnerId,
    ],
    mineGroups: (token: string) => ['group', 'mine', token],
    searchGroups: (token: string, groupName: string) => [
      'group',
      'search',
      token,
      groupName,
    ],
    updateLeader: (
      token: string,
      groupId: string,
      newLeaderRunnerId: string,
    ) => ['group', 'leader', token, groupId, newLeaderRunnerId],
  },
  auth: {
    existRunner: (token?: string) => ['auth', 'existRunner', token],
    runnerInfo: () => ['runner', 'runnerInfo'],
  },
  request: {
    all: ['request'],
    list: ['request', 'list'],
    joinRequest: (joinRequestId: string, groupId?: string) => [
      'request',
      'list',
      joinRequestId,
      groupId,
    ],
    mineRequestList: (token: string) => ['request', 'mine', token],
  },
};

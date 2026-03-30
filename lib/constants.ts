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
    selfGroups: (token: string) => ['group', 'self', token],
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
  schedule: {
    all: ['schedule'],
    list: ['schedule', 'list'],
    scheduleList: (belongId: string) => ['schedule', 'list', belongId],
  },
  actions: {
    all: ['actions'],
    list: ['actions', 'list'],
    actionsList: (scheduleId: string) => ['actions', 'list', scheduleId],
  },
  recognizes: {
    all: ['recognizes'],
  },
};

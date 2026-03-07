interface User {
  token: string;
  runnerId: string;
  runnerName: string;
  groupNickname?: string;
  belongNickname?: string;
  runnerImageLink: string;
  leader: boolean;
  isExist: boolean;
}

interface GroupInfo {
  groupId: string;
  groupDescription: string;
  groupImageLink: string;
  groupName: string;
  token: string;
}

interface JoinRequest {
  groupId: string;
  groupName: string;
  joinRequestId: string;
  token: string;
  runnerName: string;
}

interface Schedule {
  id: string;
  groupId: string;
  token: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Feed {
  title: string;
  startTime: number;
  endTime: number;
  description: string;
}

type UseMutaionCallback = {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSetteld?: () => void;
};

export type {
  Feed,
  GroupInfo,
  JoinRequest,
  Schedule,
  UseMutaionCallback,
  User,
};

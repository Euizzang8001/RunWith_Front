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
  belongId?: string;
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
  scheduleId: string;
  runnerId: string;
  belongId: string;
  groupId: string;
  scheduleDescription: string;
  scheduleYear: number;
  scheduleMonth: number;
  scheduleDate: number;
}

interface Actions {
  token: string;
  actionId: string;
  scheduleId: string;
  actionName: string;
  actionStartHour: number;
  actionStartMinute: number;
  actionEndHour: number;
  actionEndMinute: number;
}

type UseMutaionCallback = {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSetteld?: () => void;
};

export type {
  Actions,
  GroupInfo,
  JoinRequest,
  Schedule,
  UseMutaionCallback,
  User,
};

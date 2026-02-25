interface User {
  runnerId: string;
  runnerName: string;
  runnerImageLink: string;
}

interface GroupInfo {
  groupId: string;
  groupDescription: string;
  groupImageLink: string | null;
  groupName: string;
  // participants?: string[];
  // capacity?: number;
}

interface Schedule {
  id: string;
  groupId: string;
  runnerId: string;
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

export type { Feed, GroupInfo, Schedule, UseMutaionCallback, User };

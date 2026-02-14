interface User {
  id: string;
  nickname: string;
  imageUri?: string;
}

interface ImageUri {
  id?: number;
  uri: string;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  scheduleTime: string;
}

interface GroupItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  nickname: string;
  author: User;
}

interface GroupList {
  id: string;
  participants: string[];
  capacity: number;
  name: string;
}

interface Schedule {
  id: string;
  runnerId: string;
  isSelf: boolean;
  title: string;
  date: string;
  scheduleTime: string;
}

type UseMutaionCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSetteld?: () => void;
};

export type {
  GroupItem,
  GroupList,
  ImageUri,
  Post,
  Schedule,
  UseMutaionCallback,
};

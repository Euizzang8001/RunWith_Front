interface User {
  id: number;
  nickname: string;
  imageUri?: string;
}

interface Profile extends User {
  email: string;
  introduce?: string;
  hatId: string;
  handId: string;
  skinId: string;
  topId: string;
  faceId: string;
  bottomId: string;
  background: string;
}

interface ImageUri {
  id?: number;
  uri: string;
}
interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
}

interface CreateCommentDto {
  content: string;
  postId: number;
  parentCommentId?: number;
}

interface CreateVoteDto {
  postId: number;
  voteOptionId: number;
}

type PostVoteOption = VoteOption & { userVotes: { userId: number }[] };

interface PostVote {
  id: string;
  title: string;
  options: PostVoteOption[];
}
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
}

interface PostComment extends Comment {
  replies: Comment[];
}

interface Post {
  id: string;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  scheduleTime: string;
}

interface GroupItem {
  id: string;
  userId: number;
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
  title: string;
}

interface Schedule {
  id: string;
  title: string;
  date: string;
  scheduleTime: string;
}

export type {
  Comment,
  CreateCommentDto,
  CreatePostDto,
  CreateVoteDto,
  GroupItem,
  GroupList,
  ImageUri,
  Post,
  PostVote,
  PostVoteOption,
  Profile,
  Schedule,
  VoteOption,
};

import { colors } from '@/constants';
import { FlatList, StyleSheet } from 'react-native';
import FeedItem from './FeedItem';

const dummyDate = [
  {
    id: 1,
    userId: 1,
    title: '더미 제목',
    description: '더미 내용',
    scheduleTime: '10 : 00 ~ 11 : 00',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
  },
  {
    id: 2,
    userId: 2,
    title: '더미 제목',
    description: '더미 내용',
    scheduleTime: '10 : 00 ~ 11 : 00',
    createdAt: '',
    author: {
      id: 2,
      nickname: '닉네임',
      imageUri: '',
    },
  },
  {
    id: 3,
    userId: 3,
    title: '더미 제목',
    description: '더미 내용',
    scheduleTime: '10 : 00 ~ 11 : 00',
    createdAt: '',
    author: {
      id: 3,
      nickname: '닉네임',
      imageUri: '',
    },
  },
];

export default function FeedList() {
  return (
    <FlatList
      data={dummyDate}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 10,
    backgroundColor: colors.WHITE_BACKGROUND,
  },
});

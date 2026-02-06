import { colors } from '@/constants';
import { dummyDate } from '@/mocks/feedList';
import { FlatList, StyleSheet } from 'react-native';
import FeedItem from './FeedItem';

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

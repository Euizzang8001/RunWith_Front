import { colors } from '@/constants';
import { Post } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

type FeedItemProps = {
  post: Post;
};

export default function FeedItem({ post }: FeedItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.scheduleTime}</Text>
          <Text>{post.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontFamily: 'pretendard500',
  },
  item: {
    borderRadius: 24,
    backgroundColor: colors.WHITE,
    maxWidth: 400,
    maxHeight: 500,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 5,
  },
  info: { gap: 10, padding: 20 },
});

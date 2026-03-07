import { colors } from '@/constants';
import { Schedule } from '@/types';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type FeedItemProps = {
  post: Schedule;
  onPress: () => void;
};

export default function FeedItem({ post, onPress }: FeedItemProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.title}>{post.title}</Text>
            <Text>
              {post.startTime} ~ {post.endTime}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
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

import { colors } from '@/constants';
import { Schedule } from '@/types';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type FeedItemProps = {
  schedule: Schedule;
  onPress: () => void;
};

export default function FeedItem({ schedule, onPress }: FeedItemProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.title}>{schedule.scheduleDescription}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  item: {
    borderRadius: 12,
    backgroundColor: colors.WHITE,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,

    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'pretendard600',
    color: '#333',
    flexShrink: 1,
  },
});

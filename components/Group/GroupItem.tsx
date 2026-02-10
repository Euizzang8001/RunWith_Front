import { colors } from '@/constants';
import { GroupList } from '@/types';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type GroupListProps = {
  group: GroupList;
};

export default function GroupItem({ group }: GroupListProps) {
  const currentCount = group.participants.length;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/(tabs)/group/groupDetail',
          params: {
            groupId: group.id,
          },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.title}>{group.title}</Text>
            <Text style={styles.headCount}>
              {currentCount} / {group.capacity} 명
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'pretendard300',
  },
  headCount: {
    color: colors.GRAY_FONT,
  },
  item: {
    gap: 10,
    borderRadius: 24,
    backgroundColor: colors.WHITE_BACKGROUND,
    borderColor: colors.BLUE,
    borderWidth: 1,
    maxWidth: 400,
    maxHeight: 500,
  },
  info: {
    gap: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

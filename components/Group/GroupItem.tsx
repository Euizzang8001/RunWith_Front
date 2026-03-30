import { colors } from '@/constants';
import { GroupInfo } from '@/types';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GroupImage } from '../GroupImage';

type GroupListProps = {
  group: GroupInfo;
};

export default function GroupItem({ group }: GroupListProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/(tabs)/group/groupDetail',
          params: {
            groupId: group.groupId,
          },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.info}>
            <GroupImage uri={group.groupImageLink} size={50} />
            <Text style={styles.title}>{group.groupName}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.WHITE_BACKGROUND,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.BLUE,

    shadowColor: colors.BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,

    elevation: 3,
  },
  info: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'pretendard300',
    color: '#1A1A1A',
    flex: 1,
  },
  headCount: {
    color: colors.GRAY_FONT,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
});

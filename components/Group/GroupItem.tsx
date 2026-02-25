import { colors } from '@/constants';
import { GroupInfo } from '@/types';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type GroupListProps = {
  group: GroupInfo;
};

export default function GroupItem({ group }: GroupListProps) {
  const defaultGroupImage = require('@/assets/images/default-group-image.png');

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
            <Image
              source={
                group.groupImageLink
                  ? { uri: group.groupImageLink }
                  : defaultGroupImage
              }
              style={styles.groupImage}
            />
            <Text style={styles.title}>{group.groupName}</Text>
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
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 24,
  },
});

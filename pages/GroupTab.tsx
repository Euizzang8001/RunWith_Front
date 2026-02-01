import { colors } from '@/constants';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupTab() {
  const createGroup = () => {
    router.push('/(tabs)/group/createGroup');
  };

  return (
    <SafeAreaView>
      <View style={styles.container_top}>
        <Text style={styles.header}>스터디 그룹</Text>
      </View>
      <Pressable onPress={createGroup}>
        <View style={styles.plus_icon}>
          <EvilIcons name="plus" size={40} color="black" />
        </View>
      </Pressable>

      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.title}>수학 공부 Team</Text>
            <Text style={styles.headCount}>3 / 10 명</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_top: {
    paddingBottom: 10,
  },
  header: {
    marginTop: 30,
    fontSize: 18,
    fontFamily: 'pretendard500',
    alignSelf: 'center',
  },
  plus_icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 30,
  },

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

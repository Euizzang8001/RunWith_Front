import GroupList from '@/components/GroupList';
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
      <GroupList />
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
});

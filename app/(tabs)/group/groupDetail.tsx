import { colors } from '@/constants';
import { dummyGroups } from '@/mocks/groups';
import { dummyUsers } from '@/mocks/users';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupDetail() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  const group = dummyGroups.find((item) => String(item.id) === groupId);

  const members = useMemo(() => {
    if (!group) return [];
    return dummyUsers.filter((user) => group.participants.includes(user.id));
  }, [group?.participants]);

  if (!group)
    return (
      <SafeAreaView>
        <Text>그룹 데이터가 없습니다.</Text>
      </SafeAreaView>
    );

  const seletedUser = members.find((user) => user.id === selectedUser)?.name;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.leftSpace}></View>
        <Text style={styles.title}>{group.title}</Text>
        <View style={styles.icon}>
          <Ionicons name="menu-outline" size={32} color="black" />
        </View>
      </View>

      <View style={styles.user_icon_Wrapper}>
        {members.map((user) => {
          const isSelected = selectedUser === user.id;

          return (
            <Pressable
              key={user.id}
              onPress={() => setSelectedUser(user.id)}
              style={[styles.user_icon, isSelected && styles.userSelcetd]}
            >
              <Feather name="user" size={24} color={'black'} />
            </Pressable>
          );
        })}
      </View>
      <View>
        {selectedUser !== null ? (
          <View>
            <Text>{seletedUser}의 스케줄</Text>
          </View>
        ) : (
          <View>
            <Text>일정을 확인하고 싶은 그룹의 멤버를 선택하세요.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard600',
  },
  leftSpace: {
    width: 32,
  },
  icon: {
    width: 32,
    alignItems: 'flex-end',
    alignContent: 'center',
  },
  user_icon_Wrapper: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  user_icon: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: colors.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSelcetd: {
    borderWidth: 2,
    borderColor: colors.BLUE,
  },
});

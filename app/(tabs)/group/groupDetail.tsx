import { colors } from '@/constants';
import { dummyGroups } from '@/mocks/groups';
import { dummy_schedules } from '@/mocks/schedule';
import { dummyUsers } from '@/mocks/users';
import { Schedule } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupDetail() {
  const today = new Date().toLocaleDateString('sv-SE');

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  const group = dummyGroups.find((item) => String(item.id) === groupId);

  const goToGroupOption = () => {
    router.push('/(tabs)/group/groupOptions');
  };

  const selectedUserSchedules = useMemo(() => {
    if (!selectedUser) return [];

    return dummy_schedules.filter(
      (schedule) =>
        schedule.runnerId === selectedUser &&
        schedule.date === today &&
        schedule.isSelf === false,
    );
  }, [selectedUser, today]);

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
        <Pressable onPress={goToGroupOption}>
          <View style={styles.icon}>
            <Ionicons name="menu-outline" size={32} color="black" />
          </View>
        </Pressable>
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
      <View style={styles.text_container}>
        {selectedUser !== null ? (
          <View>
            <Text style={styles.seletedUserText}>{seletedUser}</Text>

            {selectedUserSchedules.length > 0 ? (
              selectedUserSchedules.map((schedule) => (
                <Pressable
                  onPress={() => {
                    setSelectedSchedule(schedule);
                    setIsModalOpen(true);
                  }}
                  style={styles.schedule_container}
                  key={schedule.id}
                >
                  <Text>{schedule.title}</Text>
                  <Text>{schedule.scheduleTime}</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.noScheduleDay}> 오늘 일정이 없습니다. </Text>
            )}
          </View>
        ) : (
          <View>
            <Text>일정을 확인하고 싶은 멤버를 선택하세요.</Text>
          </View>
        )}
        <Modal
          visible={isModalOpen}
          animationType="slide"
          onRequestClose={() => setIsModalOpen(false)}
        >
          <View>
            <View>
              {selectedSchedule && (
                <View>
                  <Text>{selectedSchedule.title}</Text>
                  <Text>{selectedSchedule.scheduleTime}</Text>

                  <Pressable onPress={() => setIsModalOpen(false)}>
                    <Text>X</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
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
  text_container: {
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  seletedUserText: {
    fontFamily: 'pretendard500',
    fontSize: 16,
  },
  schedule_container: {
    marginTop: 30,
    backgroundColor: colors.GRAY,
    padding: 20,
    borderRadius: 16,
    gap: 10,
  },
  noScheduleDay: {
    marginTop: 30,
    width: '100%',
    textAlign: 'center',
  },
});

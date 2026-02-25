import { colors } from '@/constants';
import { useGetGroupInRunner } from '@/hooks/queries/use-get-group-in-runner.data';
import { useGetGroups } from '@/hooks/queries/use-get-group.data';
import { useUserSession } from '@/store/useAuthStore';
import { useScheduleStore } from '@/store/useScheduleStore';
import { Schedule } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Runner = {
  runnerId: string;
  groupNickname: string;
  runnerName: string;
  name?: string;
};

export default function GroupDetail() {
  const user = useUserSession();
  const { schedules } = useScheduleStore();
  const today = new Date().toLocaleDateString('sv-SE');

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { groupId } = useLocalSearchParams<{
    groupId: string;
  }>();
  const { data: groups } = useGetGroups();
  const { data: runners } = useGetGroupInRunner(groupId);

  const group = groups?.find((item: any) => String(item.groupId) === groupId);

  const goToGroupOption = () => {
    if (!user) {
      Alert.alert('알림', '로그인이 필요한 서비스입니다.');
      return;
    }

    const myInfo = runners?.find(
      (runner: Runner) => runner.runnerId === user?.runnerId,
    );

    router.push({
      pathname: '/(tabs)/group/groupOptions',
      params: {
        groupId: group?.groupId,
        runnerId: myInfo?.runnerId,
      },
    });
  };

  const selectedUserSchedules = useMemo(() => {
    if (!selectedUser) return [];

    return schedules.filter(
      (schedule) =>
        schedule.runnerId === selectedUser &&
        schedule.date === today &&
        schedule.groupId === groupId,
    );
  }, [selectedUser, schedules, today, groupId]);

  // 그룹 러너 로그 찍기
  // useEffect(() => {
  //   if (runners && runners.length > 0) {
  //     console.log('러너 데이터:', runners[0]);
  //   }
  // }, [runners]);

  if (!group)
    return (
      <SafeAreaView>
        <Text>그룹 데이터가 없습니다.</Text>
      </SafeAreaView>
    );

  const selectedUserName = runners?.find(
    (user: Runner) => user.runnerId === selectedUser,
  )?.runnerName;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>
        <Text style={styles.title}>{group.groupName}</Text>
        <Pressable style={styles.icon} onPress={goToGroupOption}>
          <View>
            <Ionicons name="menu-outline" size={32} color="black" />
          </View>
        </Pressable>
      </View>

      <View style={styles.user_icon_Wrapper}>
        {runners?.map((user: Runner) => {
          const isSelected = selectedUser === user.runnerId;

          return (
            <Pressable
              key={user.runnerId}
              onPress={() => setSelectedUser(user.runnerId)}
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
            <Text style={styles.seletedUserText}>
              {selectedUserName
                ? `${selectedUserName}의 일정`
                : '닉네임을 불러 올 수 없습니다.'}
            </Text>

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
                  <Text>
                    {schedule.startTime} ~ {schedule.endTime}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.noScheduleDay}>오늘 일정이 없습니다.</Text>
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
                  <Text>
                    {selectedSchedule.startTime} ~ {selectedSchedule.endTime}
                  </Text>

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
  arrow_icon: {
    marginLeft: 5,
    width: 48,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard600',
  },
  icon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
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

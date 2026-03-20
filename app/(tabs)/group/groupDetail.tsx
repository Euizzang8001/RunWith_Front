import { ProfileImage } from '@/components/ProfileImage';
import { useGetActions } from '@/hooks/queries/actions/use-get-action';
import { useGetGroupInRunner } from '@/hooks/queries/group/use-get-group-in-runner.data';
import { useGetMineGroups } from '@/hooks/queries/group/use-get-mine-groups.data';
import { useGetSchedule } from '@/hooks/queries/schedule/use-get-schedule';
import { useUserSession } from '@/store/useAuthStore';
import { Actions, GroupInfo, Schedule, User } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../styles/group/groupdetail-styles';

export default function GroupDetail() {
  const user = useUserSession();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const { groupId } = useLocalSearchParams<{
    groupId: string;
  }>();

  const { data: getActions = [] } = useGetActions(
    user?.token || '',
    selectedSchedule?.scheduleId || '',
  );
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [scheduleAction, setScheduleAction] = useState<Actions | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: groups } = useGetMineGroups(user?.token || '');
  const { data: getGroupInRunner = [] } = useGetGroupInRunner(
    groupId,
    user?.token || '',
  );

  const group = groups?.find(
    (item: GroupInfo) => String(item.groupId) === groupId,
  );

  const goToGroupOption = () => {
    if (!user) {
      Alert.alert('알림', '로그인이 필요한 서비스입니다.');
      return;
    }

    const myInfo = getGroupInRunner?.find(
      (runner: User) => runner.runnerId === user.runnerId,
    );

    router.push({
      pathname: '/(tabs)/group/groupOptions',
      params: {
        groupId: group?.groupId,
        token: myInfo?.token,
      },
    });
  };

  const handleScheduleAdd = () => {
    if (!selectedUser) {
      Alert.alert('알림', '멤버를 먼저 선택해주세요.');
      return;
    }

    const selectedRunner = getGroupInRunner?.find(
      (runner: User) => runner.runnerId === selectedUser,
    );

    if (!selectedRunner) return;

    router.push({
      pathname: '/calendar',
      params: {
        belongId: selectedRunner.belongId,
        runnerId: selectedRunner.runnerId,
      },
    });
  };

  // 선택한 멤버의 스케줄 불러오기
  const selectedMember = useMemo(() => {
    return getGroupInRunner?.find(
      (runner: User) => runner.runnerId === selectedUser,
    );
  }, [selectedUser, getGroupInRunner]);

  const { data: getSchedule = [] } = useGetSchedule(
    user?.token,
    selectedMember?.belongId,
  );

  // 선택한 유저의 스케줄(그룹별)
  const selectedUserSchedules = useMemo(() => {
    if (!selectedUser || !getSchedule || !selectedMember) return [];

    return getSchedule.filter((schedule: Schedule) => {
      const isYearMatch = Number(schedule.scheduleYear) === year;
      const isMonthMatch = Number(schedule.scheduleMonth) === month;
      const isDateMatch = Number(schedule.scheduleDate) === date;

      const isGroupSchedule =
        String(schedule.belongId) === String(selectedMember.belongId);

      return isYearMatch && isMonthMatch && isDateMatch && isGroupSchedule;
    });
  }, [selectedUser, getSchedule, selectedMember, year, month, date]);

  if (!group)
    return (
      <SafeAreaView>
        <Text>그룹 데이터가 없습니다.</Text>
      </SafeAreaView>
    );
  const selectedUserName = getGroupInRunner?.find(
    (runner: User) => runner.runnerId === selectedUser,
  );

  const displayName =
    selectedUserName?.belongNickname ||
    selectedUserName?.groupNickname ||
    selectedUserName?.runnerName;

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
        {getGroupInRunner.map((runner: User) => {
          const isSelected = selectedUser === runner.runnerId;
          return (
            <Pressable
              key={`runner-${runner.runnerId}`}
              onPress={() => setSelectedUser(runner.runnerId)}
              style={[styles.user_icon, isSelected && styles.userSelcetd]}
            >
              <ProfileImage uri={runner.runnerImageLink} size={50} />
            </Pressable>
          );
        })}
      </View>

      <View>
        <Pressable onPress={handleScheduleAdd}>
          <Text>일정 추가</Text>
        </Pressable>
      </View>

      <View style={styles.text_container}>
        {selectedUser !== null ? (
          <View>
            <Text style={styles.seletedUserText}>
              {displayName
                ? `${displayName}의 일정`
                : '닉네임을 불러 올 수 없습니다.'}
            </Text>

            {selectedUserSchedules.length > 0 ? (
              selectedUserSchedules.map((schedule: Schedule) => (
                <Pressable
                  key={schedule.scheduleId}
                  onPress={() => {
                    setSelectedSchedule(schedule);
                    setIsModalOpen(true);
                  }}
                  style={styles.schedule_container}
                >
                  <Text>{schedule.scheduleDescription}</Text>
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
            {selectedSchedule && (
              <View>
                {/* 스케줄 제목 */}
                <Text>{selectedSchedule.scheduleDescription}</Text>

                <Text>할 일</Text>

                {/* 액션 목록 출력 */}
                {getActions.length > 0 ? (
                  getActions.map((action: Actions) => (
                    <View key={action.actionId}>
                      <Text>{action.actionName}</Text>
                      <Text>
                        {action.actionStartHour}:
                        {String(action.actionStartMinute).padStart(2, '0')} ~
                        {action.actionEndHour}:
                        {String(action.actionEndMinute).padStart(2, '0')}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text>등록된 액션이 없습니다.</Text>
                )}

                <Pressable
                  onPress={() => {
                    setIsModalOpen(false);
                    setSelectedSchedule(null);
                  }}
                >
                  <Text>닫기</Text>
                </Pressable>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

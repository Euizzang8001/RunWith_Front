import { colors } from '@/constants';
import { useGetMineGroups } from '@/hooks/queries/group/use-get-mine-groups.data';
import { useGetMySchedule } from '@/hooks/queries/schedule/use-get-my-schedule';
import { useUserSession } from '@/store/useAuthStore';
import { useActionsSchedules } from '@/store/useScheduleStore';
import { GroupInfo, Schedule } from '@/types';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FeedItem from './FeedItem';

export default function FeedList() {
  const user = useUserSession();
  const { data: groups } = useGetMineGroups(user?.token || '');
  const { data: mySchedules = [] } = useGetMySchedule(user?.token);
  const { updateScheduleStore } = useActionsSchedules();

  const [refreshing, setRefreshing] = useState(false);
  const [selecetdFeed, setSelectedFeed] = useState<Schedule | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const todaySchedule = useMemo(() => {
    if (!mySchedules) return [];

    return mySchedules.filter((schedule: Schedule) => {
      const isYearMatch = Number(schedule.scheduleYear) === year;
      const isMonthMatch = Number(schedule.scheduleMonth) === month;
      const isDateMatch = Number(schedule.scheduleDate) === date;

      return isYearMatch && isMonthMatch && isDateMatch;
    });
  }, [mySchedules, year, month, date]);

  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const handleOpenFeed = (feed: Schedule) => {
    setSelectedFeed(feed);
    setIsGroupModalOpen(true);
  };

  const handleSendGroup = ({
    groupId,
    groupName,
  }: {
    groupId: string;
    groupName: string;
  }) => {
    if (!selecetdFeed) return;

    updateScheduleStore(selecetdFeed?.scheduleId, { groupId: groupId });
    Alert.alert('연동 완료', `${groupName} 그룹에 일정이 연동 되었습니다.`);
    setIsGroupModalOpen(false);
  };

  return (
    <View>
      <FlatList
        data={todaySchedule}
        renderItem={({ item }) => (
          <FeedItem
            schedule={item}
            onPress={() => {
              handleOpenFeed(item);
            }}
          />
        )}
        keyExtractor={(item) => String(item.scheduleId)}
        contentContainerStyle={styles.contentContainerStyle}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptySchedule}>
            <Text style={styles.emptySchedule_Text}>
              오늘의 일정이 없습니다.
            </Text>
          </View>
        }
      />

      <Modal
        visible={isGroupModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsGroupModalOpen(false)}
      >
        <Pressable>
          <View>
            <Text>일정을 전달할 그룹을 선택하세요.</Text>
            {groups?.map((item: GroupInfo) => (
              <Pressable
                key={item.groupId}
                onPress={() =>
                  handleSendGroup({
                    groupId: item.groupId,
                    groupName: item.groupName,
                  })
                }
              >
                <Text>{item.groupName}</Text>
                <View>
                  <Text>선택</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 10,
    backgroundColor: colors.WHITE_BACKGROUND,
  },
  emptySchedule: {
    paddingVertical: 24,
    flex: 1,
  },
  emptySchedule_Text: {
    textAlign: 'center',
    fontFamily: 'pretendard400',
    fontSize: 16,
  },
});

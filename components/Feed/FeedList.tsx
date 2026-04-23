import { ActionModal } from '@/components/Actions/ActionModal';
import { colors } from '@/constants';
import { useGetActions } from '@/hooks/queries/actions/use-get-action';
import { useGetMineGroups } from '@/hooks/queries/group/use-get-mine-groups.data';
import { useGetMySchedule } from '@/hooks/queries/schedule/use-get-my-schedule';
import { useUserSession } from '@/store/useAuthStore';
import { useActionsSchedules } from '@/store/useScheduleStore';
import { Schedule } from '@/types';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FeedItem from './FeedItem';

export default function FeedList() {
  const user = useUserSession();
  const { data: groups } = useGetMineGroups(user?.token || '');
  const { data: mySchedules = [] } = useGetMySchedule(user?.token);
  const { updateScheduleStore } = useActionsSchedules();

  const [refreshing, setRefreshing] = useState(false);
  const [selecetdFeed, setSelectedFeed] = useState<Schedule | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: getActions = [] } = useGetActions(
    user?.token || '',
    selecetdFeed?.scheduleId || '',
  );

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
    setIsModalOpen(true);
  };

  return (
    <View style={{ flex: 1 }}>
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

      <ActionModal
        isVisible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        selectedSchedule={selecetdFeed}
        getActions={getActions}
        actionImages={{}}
        onPickImage={() => {}}
        clearActionImages={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE_BACKGROUND,
  },
  emptySchedule: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySchedule_Text: {
    textAlign: 'center',
    fontFamily: 'pretendard400',
    fontSize: 16,
    color: colors.GRAY_FONT,
  },
});

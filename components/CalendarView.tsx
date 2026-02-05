import { colors } from '@/constants';
import { Schedule } from '@/types';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNameShort: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

type CalendarViewProps = {
  schedules: Schedule[];
};

export default function CalendarView({ schedules }: CalendarViewProps) {
  const [selected, setSelected] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. 선택된 날짜의 일정만 나오게 필터링
  const filteredSchedules = useMemo(() => {
    return schedules.filter((item) => item.date === selected);
  }, [selected, schedules]);

  // 2. 일정있는 날짜에 Dot 표시
  const markedDates = useMemo(() => {
    const marks: MarkedDates = {};

    schedules.forEach((item) => {
      marks[item.date] = { marked: true, dotColor: colors.BLUE };
    });

    if (selected) {
      marks[selected] = {
        ...marks[selected],
        selected: true,
        selectedColor: colors.BLUE,
        selectedTextColor: colors.WHITE,
      };
    }
    return marks;
  }, [selected, schedules]);

  return (
    <View style={styles.calendar}>
      <CalendarList
        onDayPress={(day) => {
          setSelected(day.dateString);
          setIsModalOpen(true);
        }}
        markedDates={markedDates}
        firstDay={0}
        monthFormat={'yyyy.MM'}
        hideExtraDays={true}
        scrollEnabled
        horizontal
        pagingEnabled
        pastScrollRange={6}
        futureScrollRange={6}
        theme={
          {
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: '#FF0000',
              },
              dayTextAtIndex6: {
                color: '#033279',
              },
            },
            textMonthFontFamily: 'pretendard500',
            todayTextColor: colors.BLUE,
            arrowColor: colors.BLACK,
          } as any
        }
      />
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalOpen(false)}
        />
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.schedule_date}>
              {filteredSchedules.length > 0 && selected}
            </Text>
          </View>

          <View style={styles.schedule_container}>
            <FlatList
              bounces={true}
              showsVerticalScrollIndicator={false}
              data={filteredSchedules}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.schedule_card}>
                  <View style={styles.card_info}>
                    <Text>{item.title}</Text>
                    <Text>{item.scheduleTime}</Text>
                  </View>
                </View>
              )}
              // ListEmptyComponent={<Text>{selected && '일정이 없습니다.'}</Text>}
              scrollEnabled={true}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: { backgroundColor: colors.WHITE, paddingVertical: 10 },
  schedule_container: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  schedule_date: {
    fontSize: 16,
    textAlign: 'left',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  schedule_card: {
    backgroundColor: colors.WHITE_BACKGROUND,
    borderColor: colors.BLUE,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 100,
    marginVertical: 10,
  },
  card_info: {
    padding: 20,
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: '50%', // 내용이 적어도 화면의 40%는 차지하게
    maxHeight: '50%', // 내용이 많아도 화면의 80%까지만 (스크롤 가능하게)
  },
});

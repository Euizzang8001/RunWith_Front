import { colors } from '@/constants';
import '@/lib/calendarLocale';
import { Schedule } from '@/types';
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
import { CalendarList } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import InputField from '../InputField';

type CalendarViewProps = {
  schedules: Schedule[];
  addSchedules: (newContent: Omit<Schedule, 'id'>) => void;
  deleteSchedules: (id: string) => void;
};

export default function CalendarView({
  schedules,
  addSchedules,
  deleteSchedules,
}: CalendarViewProps) {
  const [selected, setSelected] = useState('');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);

  const [TitleInput, setTitleInput] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [pickerMode, setPickerMode] = useState<'start' | 'end' | null>(null);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  const handleTimeChange = (date: Date) => {
    const formatted = formatTime(date);
    if (pickerMode === 'start') {
      setStartTime(formatted);
    } else if (pickerMode === 'end') {
      setEndTime(formatted);
    }

    setPickerMode(null);
  };

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

  const handleAddSchedule = () => {
    addSchedules({
      date: selected,
      title: TitleInput,
      scheduleTime: `${startTime} ~ ${endTime}`,
    });
    setIsScheduleOpen(true);
    setisAddModalOpen(false);
    setStartTime('');
    setEndTime('');
    setTitleInput('');
  };

  const handleDeleteSchedule = (id: string) => {
    Alert.alert('', '정말 삭제하시겠습니까?', [
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => deleteSchedules(id),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.calendar}>
      <CalendarList
        onDayPress={(day) => {
          setSelected(day.dateString);
          setIsScheduleOpen(true);
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
        visible={isScheduleOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsScheduleOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsScheduleOpen(false)}
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

                    <Pressable onPress={() => handleDeleteSchedule(item.id)}>
                      <Text>삭제</Text>
                    </Pressable>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View>
                  <Text>{selected && '일정이 없습니다.'}</Text>
                  <Pressable
                    onPress={() => {
                      setIsScheduleOpen(false);
                      setisAddModalOpen(true);
                    }}
                  >
                    <Text>일정 추가</Text>
                  </Pressable>
                </View>
              }
              scrollEnabled={true}
            />
          </View>
        </View>
      </Modal>

      {/* 일정 추가 모달*/}
      <Modal
        visible={isAddModalOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setisAddModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <InputField
              label="일정을 입력해 주세요."
              placeholder="일정 입력하기..."
              value={TitleInput}
              onChangeText={setTitleInput}
            />

            <View style={styles.selectTime_container}>
              <Pressable
                style={styles.startTime}
                onPress={() => setPickerMode('start')}
              >
                <Text style={styles.textStartTime}>
                  {startTime || '시작 시간'}
                </Text>
              </Pressable>
              <Text style={styles.wave}>~</Text>
              <Pressable
                style={styles.endTime}
                onPress={() => setPickerMode('end')}
              >
                <Text style={styles.textEndTime}>{endTime || '종료 시간'}</Text>
              </Pressable>
            </View>

            <DateTimePicker
              isVisible={pickerMode !== null}
              mode="time"
              onConfirm={handleTimeChange}
              onCancel={() => setPickerMode(null)}
              locale="ko-KR"
            />

            <View style={styles.actionContainer}>
              <Pressable onPress={handleAddSchedule} style={styles.saveButton}>
                <Text style={styles.saveText}>저장</Text>
              </Pressable>
              <Pressable
                onPress={() => setisAddModalOpen(false)}
                style={styles.cancelButton}
              >
                <Text>취소</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
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
    minHeight: '50%',
    maxHeight: '50%',
  },
  selectTime_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    padding: 50,
  },
  startTime: {
    backgroundColor: colors.GRAY,
    padding: 20,
    borderRadius: 12,
  },
  textStartTime: {
    textAlign: 'center',
  },
  endTime: {
    backgroundColor: colors.GRAY,
    padding: 20,
    borderRadius: 12,
  },
  textEndTime: {
    textAlign: 'center',
  },
  wave: {
    padding: 20,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: colors.BLUE,

    padding: 20,
    borderRadius: 24,
  },
  saveText: {
    // color: colors.WHITE,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.RED,
    padding: 20,
    borderRadius: 24,
  },
});

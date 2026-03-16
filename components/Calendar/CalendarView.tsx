import { colors } from '@/constants';
import UseCreateActions from '@/hooks/mutations/actions/use-create-actions';
import { useDeleteActions } from '@/hooks/mutations/actions/use-delete-actions';
import UseCreateSchedule from '@/hooks/mutations/schedules/use-create-schedules';
import { useDeleteSchedule } from '@/hooks/mutations/schedules/use-delete-schedules';
import { useGetActions } from '@/hooks/queries/actions/use-get-action';
import { useGetSchedule } from '@/hooks/queries/schedule/use-get-schedule';
import '@/lib/calendarLocale';
import { useUserSession } from '@/store/useAuthStore';
import { useActionsSchedules } from '@/store/useScheduleStore';
import { styles } from '@/styles/calendar/calendarView-styles';
import { Schedule } from '@/types';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import InputField from '../InputField';

type ScheduleProps = {
  belongId: string;
  runnerId: string;
};

export default function CalendarView({ belongId, runnerId }: ScheduleProps) {
  const user = useUserSession();
  const { setLatestScheduleId } = useActionsSchedules();

  const { data: getSchedules = [] } = useGetSchedule(user?.token);
  const [targetScheduleId, setTargetScheduleId] = useState('');

  const { data: getActions = [] } = useGetActions(
    user?.token || '',
    targetScheduleId,
  );

  // 뮤테이션
  const { mutate: createSchedule, isPending: isCreateShedulePending } =
    UseCreateSchedule({
      onSuccess: (data) => {
        setIsAddModalOpen(false);
        setIsScheduleOpen(true);
        setDescriptionInput('');

        setLatestScheduleId(data.scheduleId);
      },
      onError: (error) => Alert.alert('스케줄 생성 오류', error.message),
    });

  const { mutate: deleteSchedule } = useDeleteSchedule({
    onSuccess: () => Alert.alert('스케줄 삭제 완료'),
    onError: (error) => Alert.alert('스케줄 삭제 오류', error.message),
  });

  const { mutate: deleteActions } = useDeleteActions({
    onSuccess: () => {
      Alert.alert('액션 삭제 완료');
      setIsActionListModalOpen(false);
      setIsScheduleOpen(true);
    },
    onError: (error) => Alert.alert('액션 삭제 오류', error.message),
  });

  const { mutate: createActions } = UseCreateActions({
    onSuccess: () => {
      setActionNameInput('');
      setActionDescriptionInput('');
      setStartTime('');
      setEndTime('');
      setIsActionModalOpen(true);
      Alert.alert('액션 생성 완료');
    },
    onError: (error) => Alert.alert('액션 생성 오류', error.message),
  });

  const [selected, setSelected] = useState('');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isActionListModalOpen, setIsActionListModalOpen] = useState(false);

  const [DescriptionInput, setDescriptionInput] = useState('');

  const [actionNameInput, setActionNameInput] = useState('');
  const [actionDescriptionInput, setActionDescriptionInput] = useState('');

  const [pickerMode, setPickerMode] = useState<'start' | 'end' | null>(null);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // 내 일정 필터링
  const filteredSchedules = useMemo(() => {
    if (!getSchedules || getSchedules.length === 0 || !selected) return [];

    return getSchedules.filter((item: Schedule) => {
      const itemDate = `${item.scheduleYear}-${String(
        item.scheduleMonth,
      ).padStart(2, '0')}-${String(item.scheduleDate).padStart(2, '0')}`;

      return itemDate === selected;
    });
  }, [selected, getSchedules]);

  // 일정 닷 표시

  const markedDates = useMemo(() => {
    const marks: MarkedDates = {};

    if (getSchedules) {
      getSchedules.forEach((item: Schedule) => {
        const date = `${item.scheduleYear}-${String(
          item.scheduleMonth,
        ).padStart(2, '0')}-${String(item.scheduleDate).padStart(2, '0')}`;

        marks[date] = {
          marked: true,
          dotColor: colors.BLUE,
        };
      });
    }

    if (selected) {
      marks[selected] = {
        ...marks[selected],
        selected: true,
        selectedColor: colors.BLUE,
        selectedTextColor: colors.WHITE,
      };
    }

    return marks;
  }, [selected, getSchedules]);

  // 시간 포맷

  const handleTimeChange = (date: Date) => {
    const formatted = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    if (pickerMode === 'start') setStartTime(formatted);
    else if (pickerMode === 'end') setEndTime(formatted);

    setPickerMode(null);
  };

  // 핸들러

  const handleAddSchedule = () => {
    if (!DescriptionInput.trim()) return Alert.alert('일정을 입력해 주세요.');

    const [year, month, date] = selected.split('-').map(Number);

    createSchedule({
      token: user?.token || '',
      belongId,
      scheduleYear: year,
      scheduleMonth: month,
      scheduleDate: date,
      scheduleDescription: DescriptionInput,
    });
  };

  const handleOpenActionModal = (scheduleId: string) => {
    setTargetScheduleId(scheduleId);
    setIsActionModalOpen(true);
  };

  const handleOpenActionList = (scheduleId: string) => {
    setTargetScheduleId(scheduleId);
    setIsActionListModalOpen(true);
  };

  const handleSaveAction = () => {
    if (!startTime || !endTime || !actionNameInput || !actionDescriptionInput)
      return Alert.alert('모든 정보를 입력해 주세요.');

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    createActions({
      token: user?.token || '',
      scheduleId: targetScheduleId,
      actionName: actionNameInput,
      actionDescription: actionDescriptionInput,
      actionStartHour: startHour,
      actionStartMinute: startMinute,
      actionEndHour: endHour,
      actionEndMinute: endMinute,
    });
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    Alert.alert('', '정말 삭제하시겠습니까?', [
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => deleteSchedule({ scheduleId, token: user?.token || '' }),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const handleDeleteAction = (actionId: string) => {
    Alert.alert('', '정말 삭제하시겠습니까?', [
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => deleteActions({ actionId, token: user?.token || '' }),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  if (!user) return null;

  return (
    <View style={styles.calendar}>
      <CalendarList
        onDayPress={(day) => {
          setSelected(day.dateString);
          setIsScheduleOpen(true);
        }}
        markedDates={markedDates}
        horizontal
        pagingEnabled
        theme={{ todayTextColor: colors.BLUE, arrowColor: colors.BLACK } as any}
      />

      <Modal visible={isScheduleOpen} animationType="slide" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsScheduleOpen(false)}
        />

        <View style={styles.modalContent}>
          <View style={styles.addSchedule_container}>
            <Text style={styles.schedule_date}>{selected}</Text>

            <Pressable
              onPress={() => {
                setIsScheduleOpen(false);
                setIsAddModalOpen(true);
              }}
            >
              <Text style={styles.addSchedule}>일정 추가</Text>
            </Pressable>
          </View>

          <FlatList
            data={filteredSchedules}
            keyExtractor={(item) => String(item.scheduleId)}
            renderItem={({ item }) => (
              <View style={styles.schedule_card}>
                <View style={styles.card_info}>
                  <Text>{item.scheduleDescription}</Text>

                  <Pressable
                    onPress={() => handleOpenActionList(item.scheduleId)}
                  >
                    <Text style={{ color: colors.BLUE }}>액션 보기</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleOpenActionModal(item.scheduleId)}
                  >
                    <Text style={{ color: colors.BLUE }}>액션 추가</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleDeleteSchedule(item.scheduleId)}
                  >
                    <Text style={{ color: 'red' }}>삭제</Text>
                  </Pressable>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noSchedule}>일정이 없습니다.</Text>
            }
          />
        </View>
      </Modal>

      <Modal visible={isActionListModalOpen} animationType="slide" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsActionListModalOpen(false)}
        />

        <View style={styles.modalContent}>
          <Text style={styles.schedule_date}>액션 목록</Text>

          <FlatList
            data={getActions}
            keyExtractor={(item) => String(item.actionId)}
            renderItem={({ item }) => (
              <View style={styles.schedule_card}>
                <View style={styles.card_info}>
                  <Text>{item.actionName}</Text>

                  <Text>{item.actionDescription}</Text>

                  <Text>
                    {item.actionStartHour}시 {item.actionStartMinute}분 ~{' '}
                    {item.actionEndHour}시 {item.actionEndMinute}분
                  </Text>

                  <Pressable onPress={() => handleDeleteAction(item.actionId)}>
                    <Text style={{ color: 'red' }}>삭제</Text>
                  </Pressable>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noSchedule}>액션이 없습니다.</Text>
            }
          />
        </View>
      </Modal>

      <Modal visible={isAddModalOpen} animationType="fade" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsAddModalOpen(false)}
        >
          <View style={styles.modalContent}>
            <InputField
              label="일정을 입력해 주세요."
              value={DescriptionInput}
              onChangeText={setDescriptionInput}
            />

            <View style={styles.actionContainer}>
              <Pressable
                onPress={handleAddSchedule}
                style={styles.saveButton}
                disabled={isCreateShedulePending}
              >
                <Text>확인</Text>
              </Pressable>

              <Pressable
                onPress={() => setIsAddModalOpen(false)}
                style={styles.cancelButton}
              >
                <Text>취소</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={isActionModalOpen} animationType="fade" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsActionModalOpen(false)}
        >
          <View style={styles.modalContent}>
            <InputField
              label="액션 이름"
              value={actionNameInput}
              onChangeText={setActionNameInput}
            />

            <InputField
              label="액션 설명"
              value={actionDescriptionInput}
              onChangeText={setActionDescriptionInput}
            />

            <View style={styles.selectTime_container}>
              <Pressable
                onPress={() => setPickerMode('start')}
                style={styles.startTime}
              >
                <Text>{startTime || '시작 시간'}</Text>
              </Pressable>

              <Text style={styles.wave}>~</Text>

              <Pressable
                onPress={() => setPickerMode('end')}
                style={styles.endTime}
              >
                <Text>{endTime || '종료 시간'}</Text>
              </Pressable>
            </View>

            <View style={styles.actionContainer}>
              <Pressable onPress={handleSaveAction} style={styles.saveButton}>
                <Text>저장</Text>
              </Pressable>

              <Pressable
                onPress={() => setIsActionModalOpen(false)}
                style={styles.cancelButton}
              >
                <Text>취소</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      <DateTimePicker
        isVisible={pickerMode !== null}
        mode="time"
        onConfirm={handleTimeChange}
        onCancel={() => setPickerMode(null)}
        locale="ko-KR"
      />
    </View>
  );
}

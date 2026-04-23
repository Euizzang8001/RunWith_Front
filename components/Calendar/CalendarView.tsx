import { colors } from '@/constants';
import UseCreateActions from '@/hooks/mutations/actions/use-create-actions';
import { useDeleteActions } from '@/hooks/mutations/actions/use-delete-actions';
import UseCreateSchedule from '@/hooks/mutations/schedules/use-create-schedules';
import { useDeleteSchedule } from '@/hooks/mutations/schedules/use-delete-schedules';
import { useGetActions } from '@/hooks/queries/actions/use-get-action';
import { useGetMySchedule } from '@/hooks/queries/schedule/use-get-my-schedule';
import '@/lib/calendarLocale';
import { useUserSession } from '@/store/useAuthStore';
import { useActionsSchedules } from '@/store/useScheduleStore';
import { styles } from '@/styles/calendar/calendarView-styles';
import { Schedule } from '@/types';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import InputField from '../InputField';

type ScheduleProps = {
  belongId: string;
  runnerId: string;
};

export default function CalendarView({ belongId, runnerId }: ScheduleProps) {
  const user = useUserSession();
  const { setLatestScheduleId } = useActionsSchedules();

  const { data: getMySchedules = [] } = useGetMySchedule(user?.token);
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
      Alert.alert('일정 삭제 완료');
      setIsActionListModalOpen(false);
      setIsScheduleOpen(true);
    },
    onError: (error) => Alert.alert('일정 삭제 오류', error.message),
  });

  const { mutate: createActions } = UseCreateActions({
    onSuccess: () => {
      setActionNameInput('');
      setActionDescriptionInput('');
      setStartTime('');
      setEndTime('');
      setIsActionModalOpen(false);
      Alert.alert('일정 생성 완료');
    },
    onError: (error) => Alert.alert('일정 생성 오류', error.message),
  });

  const [selected, setSelected] = useState('');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isActionListModalOpen, setIsActionListModalOpen] = useState(false);
  const [DescriptionInput, setDescriptionInput] = useState('');
  const [actionNameInput, setActionNameInput] = useState('');
  const [actionDescriptionInput, setActionDescriptionInput] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // 내 일정 필터링
  const filteredSchedules = useMemo(() => {
    if (!getMySchedules || getMySchedules.length === 0 || !selected) return [];
    return getMySchedules.filter((item: Schedule) => {
      const itemDate = `${item.scheduleYear}-${String(
        item.scheduleMonth,
      ).padStart(2, '0')}-${String(item.scheduleDate).padStart(2, '0')}`;
      return itemDate === selected;
    });
  }, [selected, getMySchedules]);

  // 일정 닷 표시
  const markedDates = useMemo(() => {
    const marks: MarkedDates = {};
    if (getMySchedules) {
      getMySchedules.forEach((item: Schedule) => {
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
  }, [selected, getMySchedules]);

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
    setIsScheduleOpen(false);
    setTimeout(() => {
      setIsActionModalOpen(true);
    }, 100);
  };

  const handleOpenActionList = (scheduleId: string) => {
    setTargetScheduleId(scheduleId);
    setIsScheduleOpen(false);
    setTimeout(() => {
      setIsActionListModalOpen(true);
    }, 100);
  };

  const handleSaveAction = () => {
    if (!startTime || !endTime || !actionNameInput || !actionDescriptionInput)
      return Alert.alert('모든 정보를 입력해 주세요.');

    const startMatch = startTime.replace(/[^0-9]/g, '');
    const endMatch = endTime.replace(/[^0-9]/g, '');

    if (startMatch.length !== 4 || endMatch.length !== 4) {
      return Alert.alert('시간은 4자리 숫자로 입력해 주세요. (예: 1430)');
    }

    const startHour = Number(startMatch.substring(0, 2));
    const startMinute = Number(startMatch.substring(2, 4));
    const endHour = Number(endMatch.substring(0, 2));
    const endMinute = Number(endMatch.substring(2, 4));

    if (startHour > 23 || endHour > 23 || startMinute > 59 || endMinute > 59) {
      return Alert.alert('올바른 시간을 입력해 주세요.');
    }

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

      {/* 일정 목록 Modal */}
      <Modal visible={isScheduleOpen} animationType="slide" transparent>
        <View style={{ flex: 1 }}>
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
                    <View style={styles.schedule_text_wrapper}>
                      <Text numberOfLines={1} ellipsizeMode="tail">
                        {item.scheduleDescription}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => handleOpenActionList(item.scheduleId)}
                    >
                      <Text style={{ color: colors.BLUE }}>상세보기</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleOpenActionModal(item.scheduleId)}
                    >
                      <Text style={{ color: colors.BLUE }}>내용 추가</Text>
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
        </View>
      </Modal>

      {/* 액션 목록 Modal */}
      <Modal visible={isActionListModalOpen} animationType="slide" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsActionListModalOpen(false)}
        />
        <View style={styles.modalContent}>
          <Text style={styles.schedule_date}>할 일 목록</Text>
          <FlatList
            data={getActions}
            keyExtractor={(item) => String(item.actionId)}
            renderItem={({ item }) => (
              <View style={styles.schedule_card}>
                <View style={styles.card_info}>
                  <Text>{item.actionName}</Text>
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
              <Text style={styles.noSchedule}>아직 일정이 없습니다.</Text>
            }
          />
        </View>
      </Modal>

      {/* 일정 추가 Modal */}
      <Modal visible={isAddModalOpen} animationType="fade" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsAddModalOpen(false)}
          >
            <View style={styles.modalContent}>
              <InputField
                label="스케줄을 입력해 주세요."
                value={DescriptionInput}
                onChangeText={setDescriptionInput}
              />
              <View style={styles.actionContainer}>
                <Pressable
                  onPress={handleAddSchedule}
                  style={styles.saveButton}
                  disabled={isCreateShedulePending}
                >
                  <Text style={{ color: colors.WHITE }}>확인</Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsAddModalOpen(false)}
                  style={styles.cancelButton}
                >
                  <Text style={{ color: colors.BLACK }}>취소</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

      {/* 액션 추가 Modal */}
      <Modal visible={isActionModalOpen} animationType="fade" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setIsActionModalOpen(false)}
            />
            <View style={styles.modalContent}>
              <InputField
                label="할 일"
                value={actionNameInput}
                onChangeText={setActionNameInput}
              />
              <InputField
                label="상세내용"
                value={actionDescriptionInput}
                onChangeText={setActionDescriptionInput}
              />

              {/* 시간 직접 입력 */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'flex-end',
                  marginBottom: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <InputField
                    label="시작 (예: 14:30)"
                    value={startTime}
                    onChangeText={setStartTime}
                    placeholder="1430"
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
                <Text style={{ paddingBottom: 15, fontSize: 18 }}>~</Text>
                <View style={{ flex: 1 }}>
                  <InputField
                    label="종료 (예: 16:00)"
                    value={endTime}
                    onChangeText={setEndTime}
                    placeholder="1600"
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
              </View>

              <View style={styles.actionContainer}>
                <Pressable onPress={handleSaveAction} style={styles.saveButton}>
                  <Text style={{ color: colors.WHITE }}>저장</Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsActionModalOpen(false)}
                  style={styles.cancelButton}
                >
                  <Text style={{ color: colors.BLACK }}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

import { styles } from '@/styles/calendar/calendarView-styles';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default function CreateAction() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleTimeChange = (date: Date) => {
    const formatted = formatTime(date);
    if (pickerMode === 'start') {
      setStartTime(formatted);
    } else if (pickerMode === 'end') {
      setEndTime(formatted);
    }

    setPickerMode(null);
  };

  const [pickerMode, setPickerMode] = useState<'start' | 'end' | null>(null);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  return (
    <Modal>
      <View style={styles.selectTime_container}>
        <Pressable
          style={styles.startTime}
          onPress={() => setPickerMode('start')}
        >
          <Text style={styles.textStartTime}>{startTime || '시작 시간'}</Text>
        </Pressable>
        <Text style={styles.wave}>~</Text>
        <Pressable style={styles.endTime} onPress={() => setPickerMode('end')}>
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
    </Modal>
  );
}

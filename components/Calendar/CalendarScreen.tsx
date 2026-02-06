import { dummy_schedules } from '@/mocks/schedule';
import { Schedule } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import CalendarView from './CalendarView';

export default function CalendarScreen() {
  const STORAGE_KEY = '@calendar_schedules';

  const [schedules, setSchedules] = useState<Schedule[]>(dummy_schedules);

  useEffect(() => {
    loadSchedules();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  }, [schedules]);

  const loadSchedules = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData) {
        setSchedules(JSON.parse(storedData));
      } else {
        setSchedules(dummy_schedules);
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(dummy_schedules),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addSchedules = (
    newContent: Omit<Schedule, 'id'> /* Schedule 타입에서 id를 뺸 모두 */,
  ) => {
    const newSchedule: Schedule = {
      ...newContent,
      id: String(Date.now()), // 임시 ID
    };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const deleteSchedules = (id: string) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CalendarView
      schedules={schedules}
      addSchedules={addSchedules}
      deleteSchedules={deleteSchedules}
    />
  );
}

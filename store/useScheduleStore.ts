import { Schedule } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';

type State = {
  schedules: Schedule[];
  latestScheduleId: string | null;
};

const intialState = {
  schedules: [],
  latestScheduleId: null,
} as State;

export const useScheduleStore = create(
  devtools(
    persist(
      combine(intialState, (set) => ({
        actions: {
          setLatestScheduleId: (scheduleId: string | null) =>
            set({ latestScheduleId: scheduleId }),

          addScheduleStore: (newContent: Omit<Schedule, 'scheduleId'>) =>
            set((state) => ({
              schedules: [
                ...state.schedules,
                { ...newContent, scheduleId: `${Date.now()}-${Math.random()}` },
              ],
            })),

          deleteScheduleStore: (scheduleId: string) =>
            set((state) => ({
              schedules: state.schedules.filter(
                (item) => item.scheduleId !== scheduleId,
              ),
            })),
          updateScheduleStore: (
            scheduleId: string,
            updates: Partial<Schedule>,
          ) =>
            set((state) => ({
              schedules: state.schedules.map((item) =>
                item.scheduleId === scheduleId ? { ...item, ...updates } : item,
              ),
            })),
        },
      })),
      {
        name: 'ScheduleStore',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (store) => ({
          schedules: store.schedules,
          latestScheduleId: store.latestScheduleId,
        }),
      },
    ),
    { name: 'ScheduleStore' },
  ),
);
export const useSchedules = () => {
  const schedules = useScheduleStore((store) => store.schedules);
  return schedules;
};

export const useActionsSchedules = () => {
  const actionsSchedules = useScheduleStore((store) => store.actions);
  return actionsSchedules;
};

export const useLatestScheduleId = () => {
  const latestScheduleId = useScheduleStore((store) => store.latestScheduleId);
  return latestScheduleId;
};

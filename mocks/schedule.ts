import { Schedule } from '@/types';

export const dummy_schedules: Schedule[] = [
  {
    id: '1',
    runnerId: '1',
    isSelf: true,
    date: '2026-02-08',
    title: '미적분',
    scheduleTime: '12 : 00 ~ 13 : 00',
  },
  {
    id: '2',
    runnerId: '1',
    isSelf: false,
    date: '2026-02-11',
    title: '영단어 외우기',
    scheduleTime: '09 : 00 ~ 10 : 30',
  },
  {
    id: '3',
    runnerId: '2',
    isSelf: true,
    date: '2026-02-11',
    title: '운동 하기',
    scheduleTime: '13 : 00 ~ 14 : 00',
  },
  {
    id: '4',
    runnerId: '3',
    isSelf: true,
    date: '2026-02-11',
    title: '기출 풀기',
    scheduleTime: '17 : 00 ~ 18 : 30',
  },
  {
    id: '5',
    runnerId: '4',
    isSelf: false,
    date: '2026-02-11',
    title: '영어 회화 공부하기',
    scheduleTime: '20 : 00 ~ 22 : 00',
  },
  {
    id: '6',
    runnerId: '5',
    isSelf: true,
    date: '2026-02-13',
    title: '피규어 쇼핑하기',
    scheduleTime: '09 : 00 ~ 15 : 00',
  },
];

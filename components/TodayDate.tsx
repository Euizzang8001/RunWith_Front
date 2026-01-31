import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function TodayDate() {
  const [today, setToday] = useState('');

  useEffect(() => {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const dateText = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${days[now.getDay()]}요일`;
    setToday(dateText);
  }, []);

  return <Text>{today}</Text>;
}

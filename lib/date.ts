export const getTodayDate = () => {
  const now = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const displayDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${days[now.getDay()]}요일`;

  const dbDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return { displayDate, dbDate };
};

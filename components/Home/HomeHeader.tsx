import TodayDate from '@/components/TodayDate';
import { colors } from '@/constants';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeHeader() {
  const goToCalendar = () => {
    router.push('/calendar');
  };

  return (
    <View style={styles.container_top}>
      <View style={styles.container}>
        <Text style={styles.header}>오늘의 목표</Text>

        <View style={styles.icon}>
          <Pressable onPress={goToCalendar}>
            <Feather name="calendar" size={24} color="black" />
          </Pressable>
          <Pressable>
            <FontAwesome5 name="bell" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.date}>
        <TodayDate />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  icon: {
    flexDirection: 'row',
    gap: 15,
  },

  header: {
    fontSize: 18,
    fontFamily: 'pretendard500',
  },
  date: {
    paddingLeft: 20,
    marginTop: 10,
  },
  container_top: {
    paddingTop: 30,
    paddingBottom: 30,
    borderColor: colors.GRAY_FONT,
    borderBottomWidth: 0.2,
  },
});

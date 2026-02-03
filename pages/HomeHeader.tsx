import TodayDate from '@/components/TodayDate';
import { colors } from '@/constants';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeHeader() {
  return (
    <View style={styles.container_top}>
      <View style={styles.bell_icon}>
        <Text style={styles.header}>오늘의 목표</Text>
        <FontAwesome5 name="bell" size={24} color="black" />
      </View>
      <View style={styles.date}>
        <TodayDate />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bell_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
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

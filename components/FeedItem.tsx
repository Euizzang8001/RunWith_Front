import { colors } from '@/constants';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodayDate from './TodayDate';

export default function FeedItem() {
  return (
    <SafeAreaView>
      <View style={styles.container_top}>
        <Text style={styles.header}>오늘의 목표</Text>
        <Text style={styles.date}>
          <TodayDate />
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.title}>수학 공부 Team</Text>
            <Text>10 : 00 - 11 : 00</Text>
            <Text>미적분</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    marginTop: 50,
    fontSize: 18,
    fontFamily: 'pretendard500',
  },
  date: {
    paddingLeft: 20,
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'pretendard400',
  },
  container_top: {
    paddingBottom: 10,
  },

  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'pretendard500',
  },
  item: {
    gap: 10,
    borderRadius: 24,
    backgroundColor: '#dfdfdf',
    maxWidth: 400,
    maxHeight: 500,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 5,
  },
  info: { gap: 10, padding: 20 },
});

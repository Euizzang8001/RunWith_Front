import CalendarScreen from '@/components/Calendar/CalendarScreen';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarPage() {
  return (
    <SafeAreaView>
      <View style={styles.container_top}>
        <Pressable style={styles.arrow_icon} onPress={() => router.back()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>

        <Text style={styles.header}>내 일정</Text>

        <View style={styles.right} />
      </View>
      <View>
        <CalendarScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_top: {
    paddingTop: 25,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard500',
    textAlign: 'center',
  },
  arrow_icon: {
    marginLeft: 5,
    width: 48,
    alignItems: 'center',
  },
  right: {
    width: 48,
  },
  inputWrapper: {
    gap: 20,
  },
});

import { colors } from '@/constants';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container_top}>
        <Text style={styles.header}>내 정보</Text>
      </View>

      <View style={styles.user}>
        <View style={styles.iconWrapper}>
          <Feather name="user" size={72} color="black" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={{ fontFamily: 'pretendard400', fontSize: 16 }}>
            박성현
          </Text>
          <Text style={{ fontFamily: 'pretendard400', fontSize: 14 }}>
            공부 열심히 하자!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_top: {
    paddingTop: 25,
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
  user: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  iconWrapper: {
    marginLeft: 30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.GRAY,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  textWrapper: {
    marginTop: 20,
    marginLeft: 20,
    gap: 30,
  },
});

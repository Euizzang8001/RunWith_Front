import GoogleLogin from '@/components/OAuth/GoogleLogin';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.title}>
        <Text style={styles.font}>RunWith</Text>
      </View>

      <View>
        <View style={styles.button}>
          <GoogleLogin />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
  },
  title: {
    marginTop: 200,
    width: '100%',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'pretendard700',
    fontSize: 28,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
    gap: 30,
  },
});

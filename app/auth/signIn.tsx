import Loader from '@/components/Loader';
import AppleLogin from '@/components/OAuth/AppleLogin';
import GoogleLogin from '@/components/OAuth/GoogleLogin';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Loader visible={isLoading} />
      <View style={styles.headerWrapper}>
        <View style={styles.logo}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.subTitle}>함께 가자 !</Text>
          <Text style={styles.mainTitle}>RunWith</Text>
        </View>
      </View>

      <View>
        <View style={styles.googleButton}>
          <GoogleLogin setIsLoading={setIsLoading} />
        </View>
        <View style={styles.appleButton}>
          <AppleLogin setIsLoading={setIsLoading} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  subTitle: {
    fontFamily: 'pretendard700',
    fontSize: 22,
    color: '#005D91',
    marginBottom: 3,
  },
  mainTitle: {
    fontFamily: 'pretendard700',
    fontSize: 40,
    color: '#000',
  },
  googleButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 30,
  },
  appleButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    gap: 30,
  },
});

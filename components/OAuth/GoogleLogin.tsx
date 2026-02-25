import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GoogleLogin() {
  const handleGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId:
        '221570016133-barlvpo8bvu8utpkh2k97tseudhpdf3e.apps.googleusercontent.com',
    });
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const response = await GoogleSignin.signIn();
      console.log('response', response);

      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(
        response.data?.idToken,
      );

      // Sign-in the user with the credential
      return signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
      console.log('--- 구글 로그인 에러 발생 ---');
      console.log(error); // 여기에 에러 내용이 찍힙니다.
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.googleLogin}>
        <GoogleSigninButton
          style={{ width: 320, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      </View>
    );
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <TouchableOpacity onPress={() => getAuth().signOut()}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  googleLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

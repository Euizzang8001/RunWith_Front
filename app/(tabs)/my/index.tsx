import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>내 정보</Text>
      </View>
    </SafeAreaView>
  );
}

import HomeTab from '@/components/Home/HomeTab';
import { colors } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

// 인덱스 페이지
export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.WHITE_BACKGROUND, flex: 1 }}
      edges={['top']}
    >
      <HomeTab />
    </SafeAreaView>
  );
}

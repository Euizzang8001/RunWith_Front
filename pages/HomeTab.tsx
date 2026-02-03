import FeedList from '@/components/FeedList';
import { View } from 'react-native';
import HomeHeader from './HomeHeader';
export default function HomeTab() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />
      <FeedList />
    </View>
  );
}

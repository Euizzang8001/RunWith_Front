import { colors } from '@/constants';
import { ActivityIndicator, Modal, View } from 'react-native';
type LoaderProps = {
  visible: boolean;
};

export default function Loader({ visible }: LoaderProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View>
        <View>
          <ActivityIndicator size="large" color={colors.BLUE} />
        </View>
      </View>
    </Modal>
  );
}

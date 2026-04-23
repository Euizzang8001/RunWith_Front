import { colors } from '@/constants';
import { ActivityIndicator, Modal, View } from 'react-native';
type LoaderProps = {
  visible: boolean;
};

export default function Loader({ visible }: LoaderProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.BLUE} />
      </View>
    </Modal>
  );
}

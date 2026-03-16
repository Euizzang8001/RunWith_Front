import { useState } from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

const defaultGroupImage = require('@/assets/images/default-group-image.png');

interface ProfileImageProps extends Omit<ImageProps, 'source'> {
  uri?: string | null;
  size?: number;
}

export const GroupImage = ({
  uri,
  size = 50,
  style,
  ...props
}: ProfileImageProps) => {
  const [isError, setIsError] = useState(false);

  const getSource = (): ImageSourcePropType => {
    if (
      !uri ||
      uri === 'null' ||
      uri === 'undefined' ||
      uri.trim() === '' ||
      isError
    ) {
      return defaultGroupImage;
    }
    return { uri };
  };

  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Image
        {...props}
        source={getSource()}
        style={styles.image}
        onError={() => setIsError(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

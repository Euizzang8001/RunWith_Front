import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  defaultImage: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ defaultImage, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : defaultImage;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});

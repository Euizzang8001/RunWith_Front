import { colors } from '@/constants';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

type CustomButtonProps = PressableProps & {
  label: string;
  size: 'small' | 'medium' | 'large';
  variant: 'filled' | 'outline';
  textVariant?: 'textSmallOutLine' | 'textSmall' | 'textFilled' | 'textOutline';
};

export default function CustomButton({
  label,
  size = 'large',
  variant = 'filled',
  textVariant = 'textFilled',
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text style={styles[textVariant]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: '80%',
    alignSelf: 'center',
    height: 63,
  },
  medium: {},
  filled: {
    backgroundColor: colors.BLUE,
  },
  small: {
    width: '25%',
    height: 33,
    alignSelf: 'flex-start',
  },
  outline: {
    fontSize: 18,
    backgroundColor: colors.WHITE,
    borderColor: colors.BLUE,
    borderWidth: 1,
  },
  textFilled: {
    color: colors.WHITE,
    fontSize: 18,
  },
  textOutline: {
    color: colors.BLUE,
    fontSize: 18,
  },
  textSmallOutLine: {
    color: colors.BLUE,
    fontSize: 14,
  },
  textSmall: {
    color: colors.WHITE,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.8,
  },
});

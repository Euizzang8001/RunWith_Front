import { colors } from '@/constants';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type InputField = TextInputProps & {
  label?: string;
  variant?: 'filled' | 'standard';
};

export default function InputField({
  label,
  variant = 'filled',
  ...props
}: InputField) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, styles[variant]]}>
        <TextInput style={styles.input} {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '87%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.BLACK,
    marginBottom: 5,
  },

  container: {
    alignSelf: 'center',
    width: '100%',
    height: 57,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  filled: {
    backgroundColor: colors.GRAY,
  },
  standard: {},
  input: {
    fontSize: 14,
    padding: 0,
    flex: 1,
  },
});

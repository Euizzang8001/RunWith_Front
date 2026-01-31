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
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, styles[variant]]}>
        <TextInput style={styles.input} {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.BLACK,
    marginBottom: 5,
    paddingLeft: 3,
  },

  container: {
    margin: 'auto',
    width: '87%',
    height: 57,
    paddingHorizontal: 10,
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

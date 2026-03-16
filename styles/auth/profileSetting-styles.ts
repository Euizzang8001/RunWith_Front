import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 80,
  },
  container: {
    flex: 1,
    margin: 16,
    gap: 30,
    marginTop: 100,
  },

  image_wrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },

  title: {
    top: 20,
    width: '100%',
    alignItems: 'center',
  },
  font: {
    fontFamily: 'pretendard700',
    fontSize: 18,
  },
  fixed: {
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 34 : 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  input_group: {
    gap: 30,
  },
});

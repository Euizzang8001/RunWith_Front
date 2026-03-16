import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container_top: {
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'pretendard500',
    textAlign: 'center',
  },
  arrow_icon: {
    marginLeft: 5,
    width: 80,
    alignItems: 'center',
  },
  inputWrapper: {
    marginTop: 20,
    gap: 30,
  },
  createButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'pretendard500',
    fontSize: 16,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
    padding: 20,
    borderRadius: 24,
  },
  image_wrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  participate: {
    right: 10,
    padding: 10,
  },
  sideArea: {
    width: 80,
  },
});

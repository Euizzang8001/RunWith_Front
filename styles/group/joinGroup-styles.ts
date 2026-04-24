import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container_top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    fontFamily: 'pretendard700',
    fontSize: 18,
    color: '#1A1A1A',
  },
  arrow_icon: {
    padding: 4,
  },
  right: {
    width: 40,
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',

    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputContainer: {
    flex: 1,
    padding: 12,
  },
  searchIcon: {
    padding: 8,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  groupName: {
    fontFamily: 'pretendard600',
    fontSize: 16,
    color: '#333',
  },
  joinText: {
    fontFamily: 'pretendard700',
    fontSize: 14,
    color: colors.BLUE || '#3498db',
  },

  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  statusText: {
    fontFamily: 'pretendard400',
    fontSize: 15,
    color: '#999',
  },
});

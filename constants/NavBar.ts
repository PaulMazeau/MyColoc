import { Platform } from 'react-native';

export const NavBarStyle = {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 30,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 51,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
} as const;

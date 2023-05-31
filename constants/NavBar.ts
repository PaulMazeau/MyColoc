import { Platform } from 'react-native';

export const NavBarStyle = {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 51,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        padding: 30,
      },
      android: {
        elevation: 3,
        shadowColor: '#808080',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
} as const;

import { Platform, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
console.log(width)
let padding = 30;

if(width <= 375) { // Pour les écrans plus petits comme iPhone SE
    padding = 0;
} else if(width > 390 && width < 414) { // Pour les écrans de taille moyenne comme iPhone 7/8, iPhone X/XS
    padding = 30;
} else if(width >= 414) { // Pour les écrans plus grands comme iPhone 7/8 Plus, iPhone 11 Pro Max
    padding = 40;
}

export const NavBarStyle = {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 15,
    height: 51,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        padding: padding,
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

import * as React from "react";
import { Dimensions, View } from "react-native";
import {
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { MiniJeuColor } from "../../constants/Colors";
import Equilibrage from '../Depense/Equilibrage';

const width = Dimensions.get('window').width;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

function Carrousel() {
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const progressValue = useSharedValue<number>(0);
  const baseOptions = isVertical
    ? ({
      vertical: true,
      width: width * 0.86,
      height: width * 0.6,
    } as const)
    : ({
      vertical: false,
      width: width * 0.8,
      height: width * 0.6,
    } as const);

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Carousel
        {...baseOptions}
        
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={1500}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={() => <Equilibrage />} //tu met la card la 
      />
      {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                flexDirection: "column",
                justifyContent: "space-between",
                width: 10,
                alignSelf: "center",
                position: "absolute",
                right: 5,
                top: 40,
              }
              : {
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100,
                alignSelf: "center",
              }
          }
        >
        </View>
      )}
      
    </View>
  );
}


export default Carrousel;
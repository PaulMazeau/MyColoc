import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface Props {
  color: string;
  width: number;
  height: number;
}

// Définition du composant SVG
function Valider(props: Props) {
  return (
    <Svg width={props.width} height={props.height} viewBox="0 0 18 13" fill="none">
      <Path d="M5.73559 10.2836L1.62213 6.20896L0.250977 7.56716L5.73559 13L17.4883 1.35821L16.1172 0L5.73559 10.2836Z" fill={props.color} />
    </Svg>
  );
}

export default Valider;

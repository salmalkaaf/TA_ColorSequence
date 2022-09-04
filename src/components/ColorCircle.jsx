import { DraxView } from "react-native-drax";
import { verticalScale } from "react-native-size-matters";

const ColorCircle = ({ color = "#7A7A7A" }) => (
  <DraxView
    payload={color}
    style={{
      height: verticalScale(42),
      width: verticalScale(42),
      backgroundColor: color,
      borderWidth: 4,
      borderColor: "black",
      borderRadius: verticalScale(21),
      marginHorizontal: 6,
    }}
  />
);

export default ColorCircle;

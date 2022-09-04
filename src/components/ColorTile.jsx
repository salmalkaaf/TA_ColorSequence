import { DraxView } from "react-native-drax";
import { verticalScale } from "react-native-size-matters";

const ColorTile = ({ color = "#7A7A7A", onColorReceived = () => { } }) => (
  <DraxView
    onReceiveDragDrop={({ dragged: { payload } }) => onColorReceived(payload)}
    style={{
      height: verticalScale(55),
      width: verticalScale(55),
      borderRadius: verticalScale(12),
      backgroundColor: color,
      borderWidth: 4,
      borderColor: "black",
      marginHorizontal: 12,
    }}
  />
);

export default ColorTile;

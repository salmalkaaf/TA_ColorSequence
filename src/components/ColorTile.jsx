import { DraxView } from "react-native-drax";
import { verticalScale } from "react-native-size-matters";
import { Audio } from "expo-av";

import { Sounds } from "../common/Const";
import { IsSoundEnabled } from "../common/GlobalState";

const ColorTile = ({ color = "#7A7A7A", onColorReceived }) => {

  const onDragReceived = async ({ dragged: { payload } }) => {
    if (onColorReceived) {
      if (IsSoundEnabled()) {
        const { sound } = await Audio.Sound.createAsync(Sounds.Tile);
        await sound.playAsync();
      }
      onColorReceived(payload);
    }
  };

  return (
    <DraxView
      onReceiveDragDrop={onDragReceived}
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
};

export default ColorTile;

import { View } from "react-native";
import { verticalScale } from "react-native-size-matters";

import ColorCircle from "./ColorCircle";

import { SequenceColors } from "../common/Const";

const ColorSequencePicker = () => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    }}
  >
    {SequenceColors.map((c) => (
      <ColorCircle color={c} key={c} />
    ))}
  </View>
);

export default ColorSequencePicker;

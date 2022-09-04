import { useMemo } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiPressable } from "moti/interactions";

import Utils from "../common/Utils";

const IconButton = ({
  icon,
  size,
  color,
  onPress,
  top,
  bottom,
  right,
  left,
  absolute = true,
  style = {},
}) => {
  const animate = useMemo(
    () =>
      ({ hovered, pressed }) => {
        "worklet";
        return {
          opacity: hovered || pressed ? 0.8 : 1,
          scale: hovered || pressed ? 1.1 : 1,
        };
      },
    []
  );

  const transition = useMemo(
    () =>
      ({ hovered, pressed }) => {
        "worklet";
        return {
          delay: hovered || pressed ? 0 : 50,
        };
      },
    []
  );

  const absoluteStyle = {
    position: "absolute",
    top,
    bottom,
    right,
    left,
  };

  let styles = { ...style };
  if (absolute) {
    styles = { ...styles, ...absoluteStyle };
  }

  return (
    <View style={styles}>
      <MotiPressable
        onPress={onPress}
        animate={animate}
        transition={transition}
      >
        <View
          style={{
            padding: size / 3,
            borderRadius: size,
            borderWidth: 4,
            backgroundColor: color,
            borderColor: Utils.ColorShade(color, -80),
          }}
        >
          <MaterialIcons name={icon} size={size} color={"white"} />
        </View>
      </MotiPressable>
    </View>
  );
};

export default IconButton;

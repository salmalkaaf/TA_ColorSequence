import { Pressable, StyleSheet, Text, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

import MotiScaler from "./MotiScaler";

import Utils from "../common/Utils";
import { Font } from "../common/Const";

const TextButton = ({ title, color, onPress }) => {
  return (
    <MotiScaler>
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: color,
              borderColor: Utils.ColorShade(color, -80),
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              { textShadowColor: Utils.ColorShade(color, -80) },
            ]}
            selectable={false}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </MotiScaler>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderRadius: verticalScale(30),
    width: verticalScale(160),
    padding: verticalScale(12),
  },
  label: {
    color: "white",
    textAlign: "center",
    fontFamily: Font.FontName,
    fontSize: verticalScale(30),
    textShadowOffset: { width: verticalScale(3), height: verticalScale(3) },
    textShadowRadius: verticalScale(2),
  },
});

export default TextButton;

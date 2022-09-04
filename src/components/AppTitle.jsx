import { View, Text, StyleSheet } from "react-native";
import { verticalScale } from "react-native-size-matters";

import MotiScaler from "./MotiScaler";
import { Font, SequenceColors } from "../common/Const";

const AppTitle = () => {
  const header = "COLOR SEQUENCE";
  const subtitle = "MEMORIZER";

  const getColorAtIndex = (index) => {
    const arr = [
      ...SequenceColors,
      ...SequenceColors,
      ...SequenceColors,
      ...SequenceColors,
    ];
    return arr[index];
  };

  return (
    <MotiScaler fromScale={1.02} toScale={1.1} duration={2000}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          {header.split("").map((c, i) => (
            <Text
              key={`${i}`}
              style={[
                {
                  color: getColorAtIndex(i),
                  fontSize: verticalScale(52),
                },
                styles.text,
              ]}
            >
              {c}
            </Text>
          ))}
        </Text>
        <Text style={{ textAlign: "center" }}>
          {subtitle.split("").map((c, i) => (
            <Text
              key={`${i}`}
              style={[
                {
                  color: getColorAtIndex(i),
                  fontSize: verticalScale(38),
                },
                styles.text,
              ]}
            >
              {c}
            </Text>
          ))}
        </Text>
      </View>
    </MotiScaler>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Font.FontName,
    textShadowColor: "#585858",
    textShadowOffset: { width: verticalScale(3), height: verticalScale(3) },
    textShadowRadius: verticalScale(2),
  },
});

export default AppTitle;

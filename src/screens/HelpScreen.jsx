import { useState } from "react";
import { Text, View } from "react-native";
import { DraxProvider } from "react-native-drax";
import { verticalScale } from "react-native-size-matters";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppColors, Font } from "../common/Const";

import ColorTile from "../components/ColorTile";
import BackToHomeButton from "../components/BackToHomeButton";
import ColorSequencePicker from "../components/ColorSequencePicker";

const HelpScreen = ({ onPressHome }) => {
  const [selectedColors, setSelectedColors] = useState([]);

  const getUserTiles = () => {
    return [...Array(3)].map((_, i) => {
      const color = selectedColors[i] ?? "white";
      return (
        <ColorTile
          color={color}
          key={`UT-${i}`}
          onColorReceived={(c) => onColorDragged(i, c)}
        />
      );
    });
  };

  const onColorDragged = (index, color) => {
    const clrs = [...selectedColors];
    clrs[index] = color;
    setSelectedColors(clrs);
  };

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: AppColors.ScreenBG }}
    >
      <DraxProvider>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginVertical: verticalScale(8),
            marginHorizontal: 50,
          }}
        >
          <Text
            style={{
              fontSize: verticalScale(40),
              fontFamily: Font.FontName,
              textAlign: "center",
            }}
          >
            HOW TO PLAY
          </Text>
          <Text
            style={{
              fontSize: verticalScale(20),
              fontFamily: Font.FontName,
              textAlign: "center",
              marginTop: verticalScale(8),
            }}
          >
            In each level you will have to observe the sequence of colors and
            repeat the same sequence in the empty squares.You will have time to
            memorize, after which the colors will be hidden. After completing,
            you should click on the Check ✅ button.
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: verticalScale(12),
              marginBottom: verticalScale(12),
              marginHorizontal: 30,
              justifyContent: "space-evenly",
            }}
          >
            {getUserTiles()}
          </View>
          <Text
            style={{
              fontSize: verticalScale(22),
              fontFamily: Font.FontName,
              textAlign: "center",
              marginBottom: verticalScale(6),
            }}
          >
            Try it! Drag the colors to slots.
          </Text>
          <ColorSequencePicker />
        </View>
        <BackToHomeButton onPress={onPressHome} />
      </DraxProvider>
    </GestureHandlerRootView>
  );
};

export default HelpScreen;

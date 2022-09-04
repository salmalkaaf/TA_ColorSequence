import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DraxProvider } from "react-native-drax";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters";

import Utils from "../common/Utils";
import { AppColors, Font, SequenceColors } from "../common/Const";

import TryAgainModal from "../modals/TryAgainModal";
import LevelWonModal from "../modals/LevelWonModal";

import ColorTile from "../components/ColorTile";
import IconButton from "../components/IconButton";
import ColorCircle from "../components/ColorCircle";
import BackToHomeButton from "../components/BackToHomeButton";
import { GetLevel, IncreaseLevel } from "../common/GlobalState";

const GameScreen = ({ mode, onGoToHome }) => {
  const { noOfTiles } = mode;

  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const [colorsVisible, setColorsVisible] = useState(true);
  const [userSelectionVisible, setUserSelectionVisible] = useState(false);

  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    startLevel();
  }, []);

  const startLevel = async () => {
    setIsGameLost(false);
    setIsGameWon(false);

    setColorsVisible(true);
    setUserSelectionVisible(false);

    setColors(Utils.GetRandomElementsFromArray(SequenceColors, noOfTiles));
    setSelectedColors([]);

    await Utils.Sleep(3);

    setColorsVisible(false);
    setUserSelectionVisible(true);
  };

  const getColorTiles = () => {
    return [...Array(colors.length)].map((_, i) => (
      <ColorTile
        color={colorsVisible ? colors[i] : undefined}
        key={`CT-${i}`}
      />
    ));
  };

  const getUserTiles = () => {
    return [...Array(colors.length)].map((_, i) => {
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

  const getColorCircles = () => {
    return SequenceColors.map((c) => <ColorCircle color={c} key={c} />);
  };

  const onColorDragged = (index, color) => {
    const clrs = [...selectedColors];
    clrs[index] = color;
    setSelectedColors(clrs);
  };

  const onPressCheck = async () => {
    setColorsVisible(true);
    const isSameColorSequence = Utils.AreArraysEqual(colors, selectedColors);
    if (isSameColorSequence) {
      setIsGameWon(true);
      await Utils.Sleep(3);
      IncreaseLevel(mode);
      startLevel();
    } else {
      await Utils.Sleep(1.5);
      setIsGameLost(true);
    }
  };

  const onPressTryAgain = () => startLevel();

  const onPressHome = () => {
    setIsGameLost(false);
    onGoToHome();
  };

  return (
    <GestureHandlerRootView style={styles.main}>
      <DraxProvider>
        <View style={styles.colorTilesContainer}>{getColorTiles()}</View>
        <Text style={styles.label}>
          Memorize this color sequence and try repeat it!
        </Text>
        {userSelectionVisible && (
          <>
            <View style={styles.userTilesContainer}>{getUserTiles()}</View>
            <Text style={styles.label}>
              Drag the colors to the slots. Then, click Check.
            </Text>
            <View style={styles.colorCircleContainer}>
              {getColorCircles()}
              <IconButton
                icon={"check"}
                onPress={onPressCheck}
                size={verticalScale(32)}
                color={SequenceColors[3]}
                absolute={false}
              />
            </View>
          </>
        )}
      </DraxProvider>
      <TryAgainModal
        isVisible={isGameLost}
        onPressTryAgain={onPressTryAgain}
        onPressHome={onPressHome}
      />
      <LevelWonModal isVisible={isGameWon} />
      <BackToHomeButton onPress={onGoToHome} />
      <Text style={styles.levelLabel}>Level:{GetLevel(mode)}</Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColors.ScreenBG,
    overflow: "hidden",
  },
  colorTilesContainer: {
    flexDirection: "row",
    marginTop: verticalScale(24),
    marginBottom: verticalScale(16),
    marginHorizontal: verticalScale(30),
    justifyContent: "space-evenly",
  },
  label: {
    fontSize: verticalScale(22),
    fontFamily: Font.FontName,
    textAlign: "center",
  },
  levelLabel: {
    fontSize: verticalScale(18),
    fontFamily: Font.FontName,
    textAlign: "center",
    position: "absolute",
    right: 12,
    top: 12
  },
  userTilesContainer: {
    flexDirection: "row",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    marginHorizontal: verticalScale(30),
    justifyContent: "space-evenly",
  },
  colorCircleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: verticalScale(8),
    marginHorizontal: verticalScale(60),
  },
});

export default GameScreen;

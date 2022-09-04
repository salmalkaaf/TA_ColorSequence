import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DraxProvider } from "react-native-drax";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters";
import { Audio } from "expo-av";

import Utils from "../common/Utils";
import { GetLevel, IncreaseLevel, IsSoundEnabled } from "../common/GlobalState";
import { AppColors, Font, SequenceColors, Sounds } from "../common/Const";

import TryAgainModal from "../modals/TryAgainModal";
import LevelWonModal from "../modals/LevelWonModal";

import ColorTile from "../components/ColorTile";
import IconButton from "../components/IconButton";
import BackToHomeButton from "../components/BackToHomeButton";
import ColorSequencePicker from "../components/ColorSequencePicker";

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

  const onColorDragged = (index, color) => {
    const clrs = [...selectedColors];
    clrs[index] = color;
    setSelectedColors(clrs);
  };

  const onPressCheck = async () => {
    setColorsVisible(true);
    const isSameColorSequence = Utils.AreArraysEqual(colors, selectedColors);
    if (isSameColorSequence) {
      if (IsSoundEnabled()) {
        const { sound } = await Audio.Sound.createAsync(Sounds.LevelWon);
        await sound.playAsync();
      }
      setIsGameWon(true);
      await Utils.Sleep(3);
      IncreaseLevel(mode);
      startLevel();
    } else {
      await Utils.Sleep(1.5);
      if (IsSoundEnabled()) {
        const { sound } = await Audio.Sound.createAsync(Sounds.LevelLost);
        await sound.playAsync();
      }
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
              <ColorSequencePicker />
              <View>
                <IconButton
                  icon={"check"}
                  onPress={onPressCheck}
                  size={verticalScale(32)}
                  color={SequenceColors[3]}
                  absolute={false}
                  style={styles.checkButton}
                />
              </View>
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
    top: 12,
  },
  userTilesContainer: {
    flexDirection: "row",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    marginHorizontal: verticalScale(30),
    justifyContent: "space-evenly",
  },
  colorCircleContainer: {
    marginTop: verticalScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: verticalScale(60),
  },
  checkButton: {
    marginLeft: verticalScale(12),
  },
});

export default GameScreen;

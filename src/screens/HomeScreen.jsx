import { View } from "react-native";

import AppTitle from "../components/AppTitle";
import TextButton from "../components/TextButton";
import HelpButton from "../components/HelpButton";
import SoundToggleButton from "../components/SoundToggleButton";

import { AppColors, GameModes, SequenceColors } from "../common/Const";

const HomeScreen = ({ onGameModeSelected, onPressHelp }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: AppColors.ScreenBG,
    }}
  >
    <AppTitle />
    <View style={{ marginTop: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <TextButton
          title={GameModes.Easy.title}
          onPress={() => onGameModeSelected(GameModes.Easy)}
          color={SequenceColors[1]}
        />
        <View style={{ margin: 12 }} />
        <TextButton
          title={GameModes.Medium.title}
          onPress={() => onGameModeSelected(GameModes.Medium)}
          color={SequenceColors[3]}
        />
      </View>
      <View style={{ margin: 12 }} />
      <View style={{ flexDirection: "row" }}>
        <TextButton
          title={GameModes.Hard.title}
          onPress={() => onGameModeSelected(GameModes.Hard)}
          color={SequenceColors[4]}
        />
        <View style={{ margin: 12 }} />
        <TextButton
          title={GameModes.Expert.title}
          onPress={() => onGameModeSelected(GameModes.Expert)}
          color={SequenceColors[0]}
        />
      </View>
    </View>
    <SoundToggleButton />
    <HelpButton onPress={onPressHelp} />
  </View>
);

export default HomeScreen;

import { useState } from "react";

import HelpScreen from "./src/screens/HelpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";

const GameNavigator = () => {
  const [helpVisible, setHelpVisible] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState();

  let screen = (
    <HomeScreen
      onGameModeSelected={setSelectedGameMode}
      onPressHelp={() => setHelpVisible(true)}
    />
  );

  if (helpVisible) {
    screen = <HelpScreen onPressHome={() => setHelpVisible(false)} />;
  } else if (selectedGameMode) {
    screen = (
      <GameScreen
        mode={selectedGameMode}
        onGoToHome={() => setSelectedGameMode()}
      />
    );
  }

  return screen;
};

export default GameNavigator;

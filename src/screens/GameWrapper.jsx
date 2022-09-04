import { useState } from "react";

import GameScreen from "./GameScreen";
import HomeScreen from "./HomeScreen";

const GameWrapper = () => {
  const [selectedGameMode, setSelectedGameMode] = useState();
  return (
    <>
      {selectedGameMode ? (
        <GameScreen mode={selectedGameMode} onGoToHome={() => setSelectedGameMode()} />
      ) : (
        <HomeScreen onGameModeSelected={setSelectedGameMode} />
      )}
    </>
  );
};

export default GameWrapper;

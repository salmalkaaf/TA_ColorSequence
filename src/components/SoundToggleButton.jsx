import { Audio } from "expo-av";

import IconButton from "./IconButton";

import { Sounds } from "../common/Const";
import { SequenceColors } from "../common/Const";
import { SetSoundEnabled, useGlobalState } from "../common/GlobalState";

const SoundToggleButton = () => {
  const [soundEnabled] = useGlobalState("soundEnabled");

  const onPress = async () => {
    const enabled = !soundEnabled;
    if (enabled) {
      const { sound } = await Audio.Sound.createAsync(Sounds.Tile);
      await sound.playAsync();
    }
    SetSoundEnabled(enabled);
  }

  return (
    <IconButton
      icon={soundEnabled ? "volume-up" : "volume-off"}
      onPress={onPress}
      size={32}
      color={SequenceColors[soundEnabled ? 3 : 0]}
      top={12}
      right={12}
    />
  );
};

export default SoundToggleButton;

import IconButton from "./IconButton";
import { SequenceColors } from "../common/Const";
import { SetSoundEnabled, useGlobalState } from "../common/GlobalState";

const SoundToggleButton = () => {
  const [soundEnabled] = useGlobalState("soundEnabled");

  return (
    <IconButton
      icon={soundEnabled ? "volume-up" : "volume-off"}
      onPress={() => SetSoundEnabled(!soundEnabled)}
      size={32}
      color={SequenceColors[soundEnabled ? 3 : 0]}
      top={12}
      right={12}
    />
  );
};

export default SoundToggleButton;

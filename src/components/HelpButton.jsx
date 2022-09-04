import IconButton from "./IconButton";
import { SequenceColors } from "../common/Const";

const HelpButton = ({ onPress }) => {
  return (
    <IconButton
      icon={"help"}
      onPress={onPress}
      size={32}
      color={SequenceColors[5]}
      bottom={12}
      left={12}
    />
  );
};

export default HelpButton;

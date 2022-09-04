import IconButton from "./IconButton";
import { SequenceColors } from "../common/Const";

const BackToHomeButton = ({ onPress }) => {
  return (
    <IconButton
      icon={"home"}
      onPress={onPress}
      size={26}
      color={SequenceColors[4]}
      top={12}
      left={12}
    />
  );
};

export default BackToHomeButton;

import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import { verticalScale } from "react-native-size-matters";

import { SequenceColors } from "../common/Const";
import IconButton from "../components/IconButton";

const LevelWonModal = ({ isVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        icon={"check"}
        size={verticalScale(52)}
        color={SequenceColors[3]}
        absolute={false}
      />
    </Modal>
  );
};

export default LevelWonModal;

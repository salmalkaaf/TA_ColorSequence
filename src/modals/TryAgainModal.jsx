import { Text, View, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { verticalScale } from "react-native-size-matters";

import IconButton from "../components/IconButton";
import { AppColors, Font, SequenceColors } from "../common/Const";

const TryAgainModal = ({ isVisible, onPressHome, onPressTryAgain }) => {
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
    >
      <View
        style={{
          flex: 1,
          margin: verticalScale(16),
          borderRadius: verticalScale(30),
          borderWidth: 10,
          borderColor: SequenceColors[4],
          backgroundColor: AppColors.ScreenBG,
          width: "100%",
          maxWidth: verticalScale(400),
          height: "100%",
          maxHeight: verticalScale(200),
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Font.FontName,
            fontSize: verticalScale(50),
            color: "#ED4A49",
            marginVertical: verticalScale(12),
            marginHorizontal: 12,
          }}
        >
          TRY AGAIN!
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "70%",
          }}
        >
          <IconButton
            icon={"home"}
            onPress={onPressHome}
            size={verticalScale(32)}
            color={SequenceColors[3]}
            absolute={false}
          />
          <IconButton
            icon={"refresh"}
            onPress={onPressTryAgain}
            size={verticalScale(32)}
            color={SequenceColors[1]}
            absolute={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default TryAgainModal;

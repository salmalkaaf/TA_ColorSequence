import "react-native-reanimated";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import * as Fonts from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import GameNavigator from "./GameNavigator";

import Utils from "./src/common/Utils";
import { AppColors, Font, Images } from "./src/common/Const";
import { LoadLocallyCachedState } from "./src/common/GlobalState";

if (Utils.Is_On_Web()) {
  window._frameTimestamp = null;
}

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync();
      if (Utils.Is_On_Web()) {
        //PREVENT DRAG-TO-SCROLL ON MOBILE BROWSERS
        document.addEventListener("touchmove", (e) => e.preventDefault(), {
          passive: false,
        });
      }
      await LoadLocallyCachedState();
      await Fonts.loadAsync({
        [Font.FontName]: Font.FontFile,
      });
      await Utils.Sleep(2);
      setIsReady(true);
      await SplashScreen.hideAsync();
    })();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: AppColors.ScreenBG }}>
        <Image
          source={Images.Splash}
          style={{ height: "100%", width: "100%" }}
          resizeMode={"contain"}
        />
      </View>
    );
  }

  return (
    <>
      <GameNavigator />
      <StatusBar hidden />
    </>
  );
};

export default App;

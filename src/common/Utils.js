import { Platform } from "react-native";

export default class Utils {
  //#region Utilities
  static Sleep = (seconds = 1) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  };

  static ColorShade = (col, amt) => {
    col = col.replace(/^#/, "");
    if (col.length === 3)
      col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

    let [r, g, b] = col.match(/.{2}/g);
    [r, g, b] = [
      parseInt(r, 16) + amt,
      parseInt(g, 16) + amt,
      parseInt(b, 16) + amt,
    ];

    r = Math.max(Math.min(255, r), 0).toString(16);
    g = Math.max(Math.min(255, g), 0).toString(16);
    b = Math.max(Math.min(255, b), 0).toString(16);

    const rr = (r.length < 2 ? "0" : "") + r;
    const gg = (g.length < 2 ? "0" : "") + g;
    const bb = (b.length < 2 ? "0" : "") + b;

    return `#${rr}${gg}${bb}`;
  };

  static GenerateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  //#endregion

  //#region Array Methods
  static GetRandomElementsFromArray = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  static AreArraysEqual = (array1, array2) => {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
        return false;
      });
    }
    return false;
  };
  //#endregion

  //#region Platform Detection
  static Is_On_iOS = () => Platform.OS === "ios";
  static Is_On_Android = () => Platform.OS === "android";
  static Is_On_Web = () => Platform.OS === "web";
  //#endregion
}

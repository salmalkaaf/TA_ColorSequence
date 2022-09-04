import { createGlobalState } from "react-hooks-global-state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameModes } from "./Const";

const CACHED_STATE = "CACHED_STATE";

const initialState = {
  soundEnabled: true,
  easyLevel: 1,
  mediumLevel: 1,
  hardLevel: 1,
  expertLevel: 1,
};

const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState(initialState);

const _GetLevelKeyFromMode = (mode) => {
  let v = "";
  switch (mode) {
    case GameModes.Easy:
      v = "easyLevel";
      break;
    case GameModes.Medium:
      v = "mediumLevel";
      break;
    case GameModes.Hard:
      v = "hardLevel";
      break;
    case GameModes.Expert:
      v = "expertLevel";
      break;
    default:
      break;
  }
  return v;
};

//#region - Getters

export const GetLevel = (mode) => {
  let key = _GetLevelKeyFromMode(mode);
  if (key.length > 0) {
    return getGlobalState(key);
  }
  return 1;
};

export const IsSoundEnabled = () => getGlobalState("soundEnabled");

//#endregion

//#region - Cachable Global State

export const SetSoundEnabled = (isEnabled) => {
  setGlobalState("soundEnabled", (v) => isEnabled);
  CacheStateLocally();
};

export const IncreaseLevel = (mode) => {
  let key = _GetLevelKeyFromMode(mode);
  if (key.length > 0) {
    const currentLevel = GetLevel(mode);
    const newLevel = currentLevel + 1;
    setGlobalState(key, (v) => newLevel);
    CacheStateLocally();
  }
};

//#endregion

//#region - Persisting Global State

const CacheStateLocally = async () => {
  let cacheableState = {
    soundEnabled: getGlobalState("soundEnabled"),
    easyLevel: getGlobalState("easyLevel"),
    mediumLevel: getGlobalState("mediumLevel"),
    hardLevel: getGlobalState("hardLevel"),
    expertLevel: getGlobalState("expertLevel"),
  };
  cacheableState = JSON.stringify(cacheableState);
  await AsyncStorage.setItem(CACHED_STATE, cacheableState);
};

export const LoadLocallyCachedState = async () => {
  let currentState = { ...initialState };
  const stateKeys = Object.keys(initialState);
  const strLocallyCachedState = await AsyncStorage.getItem(CACHED_STATE);
  const locallyCachedState = JSON.parse(strLocallyCachedState);
  if (locallyCachedState !== null || locallyCachedState !== undefined) {
    currentState = { ...currentState, ...locallyCachedState };
  }

  for (const key of stateKeys) setGlobalState(key, (v) => currentState[key]);

  return true;
};

//#endregion

export { useGlobalState, getGlobalState, setGlobalState };

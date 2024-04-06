import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const getWindowHeight = (
  percentage: string | number
): number => {
  if (typeof percentage === "number") {
    return SCREEN_HEIGHT * (percentage / 100);
  } else {
    return (
      SCREEN_HEIGHT * (Number(percentage.replace("%", "")) / 100)
    );
  }
};

export const getWindowHeightWorklet = (
  percentage: string | number
): number => {
  "worklet";

  if (typeof percentage === "number") {
    return SCREEN_HEIGHT * (percentage / 100);
  }
  return SCREEN_HEIGHT * (Number(percentage.replace("%", "")) / 100);
};

export const getWindowWidthWorklet = (
  percentage: string | number
): number => {
  "worklet";

  if (typeof percentage === "number") {
    return SCREEN_WIDTH * (percentage / 100);
  }
  return SCREEN_WIDTH * (Number(percentage.replace("%", "")) / 100);
};

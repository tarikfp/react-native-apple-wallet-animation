import {
  getWindowHeightWorklet,
  getWindowWidthWorklet,
} from "../utils/layout";

export const MOBILE_KEY_CARD_DEFAULT_TRANSLATE_Y =
  getWindowHeightWorklet(-18.75);

export const CARD_HEIGHT = getWindowHeightWorklet(28);
export const CARD_BORDER_RADIUS = 12;
export const CARD_WIDTH = getWindowWidthWorklet(100) - 16 * 2;
export const mobileKeyCardTranslateYOutput = [
  MOBILE_KEY_CARD_DEFAULT_TRANSLATE_Y - 20,
  MOBILE_KEY_CARD_DEFAULT_TRANSLATE_Y,
  MOBILE_KEY_CARD_DEFAULT_TRANSLATE_Y + 20,
  -40,
] as number[];

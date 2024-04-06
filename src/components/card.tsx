import React, { memo } from "react";
import { ImageSourcePropType } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import {
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_WIDTH,
  mobileKeyCardTranslateYOutput,
} from "./constants";

type Props = {
  onPress?: () => void;
  index: number;
  scrollY: SharedValue<number>;
  shouldDisplayAsStack?: boolean;
  sharedElementId: string;
  imageSource: ImageSourcePropType;
};

const CardInner: React.FC<Props> = ({
  shouldDisplayAsStack = false,
  sharedElementId,
  onPress,
  scrollY,
  imageSource,
  index: i,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const animatedTop = interpolate(
      scrollY.value,
      [-50, 0, 50, 300],
      mobileKeyCardTranslateYOutput,
      Extrapolation.CLAMP
    );

    return {
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      borderRadius: CARD_BORDER_RADIUS,
      transform: [
        {
          translateY: withSpring(
            shouldDisplayAsStack ? i * animatedTop : 0,
            {
              damping: 15,
              mass: 0.8,
              stiffness: 100,
              overshootClamping: false,
              restDisplacementThreshold: 0.1,
              restSpeedThreshold: 0.1,
            }
          ),
        },
      ],
    };
  });

  return (
    <SharedElement id={sharedElementId}>
      <Animated.View style={animatedStyle}>
        <BaseButton style={{ flex: 1 }} onPress={onPress}>
          <Animated.Image style={imageStyle} source={imageSource} />
        </BaseButton>
      </Animated.View>
    </SharedElement>
  );
};

export const Card = memo(CardInner);

const imageStyle = {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
};

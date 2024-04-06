import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import {
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_WIDTH,
} from "./constants";

type Props = {
  image: ImageSourcePropType;
  sharedElementId: string;
  scrollY: SharedValue<number>;
};

export const DetailCard: React.FC<Props> = ({
  sharedElementId,
  image,
  scrollY,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-210, -30, 0, 30, 210],
      [1.05, 0.75, 0.7, 0.65, 0.4],
      Extrapolation.CLAMP
    );

    return {
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      borderRadius: CARD_BORDER_RADIUS,
      transform: [
        {
          scale,
        },
      ],
    };
  });

  return (
    <SharedElement id={sharedElementId}>
      <Animated.View style={animatedStyle}>
        <Image style={cardDetailStyle} source={image} />
      </Animated.View>
    </SharedElement>
  );
};

const cardDetailStyle = {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
};

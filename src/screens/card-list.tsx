import { PlatformPressable } from "@react-navigation/elements";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Image,
  LayoutAnimation,
  ListRenderItemInfo,
  Platform,
  PlatformColor,
  StyleSheet,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardStackScreenProps } from "../cards-stack";
import { Card } from "../components/card";
import { CardData, data } from "../data";

export default function CardList({
  navigation,
}: CardStackScreenProps<"CardList">) {
  const flatListRef = useRef<FlatList | null>(null);
  const [cardsData, setCardsData] = useState<Array<CardData>>(data);
  const [shouldDisplayAsStack, setShouldDisplayAsStack] =
    useState(true);
  const scrollY = useSharedValue(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PlatformPressable
            onPress={() =>
              setShouldDisplayAsStack((prev) => {
                if (prev === false) {
                  flatListRef.current?.scrollToIndex({
                    index: 0,
                    animated: true,
                  });
                }
                return !prev;
              })
            }
          >
            <Image
              style={{
                width: 25,
                height: 27,
                tintColor: PlatformColor("systemBlue"),
              }}
              source={require("../../assets/wallet-icon.png")}
            />
          </PlatformPressable>
        );
      },
    });
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const onCardPress = useCallback(
    (item: CardData, index: number) => () => {
      const isLastItem = cardsData.length - 1 === index;

      // pressed card is the last item, navigate to the card detail
      if (isLastItem) {
        navigation.navigate("CardDetail", {
          item,
        });
        return;
      }

      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut
      );

      setCardsData((prev) => [
        ...prev.filter((prevData) => prevData.id !== item.id),
        item,
      ]);
    },
    []
  );

  const renderListItem = ({
    item,
    index,
  }: ListRenderItemInfo<CardData>) => {
    return (
      <Card
        scrollY={scrollY}
        imageSource={item.image}
        index={index}
        onPress={onCardPress(item, index)}
        shouldDisplayAsStack={shouldDisplayAsStack}
        sharedElementId={item.id}
      />
    );
  };

  const renderListItemSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <Animated.FlatList
        ref={flatListRef}
        bounces
        bouncesZoom
        scrollEventThrottle={16}
        data={cardsData}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderListItemSeparator}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        renderItem={renderListItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  separator: {
    paddingVertical: 8,
  },
});

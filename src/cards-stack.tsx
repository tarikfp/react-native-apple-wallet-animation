import { NavigationContainer } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Platform } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { CardData } from "./data";
import { CardDetail } from "./screens/card-detail";
import CardList from "./screens/card-list";

type CardStackParamList = {
  CardList: undefined;
  CardDetail: { item: CardData };
};

export type CardStackScreenProps<
  RouteName extends keyof CardStackParamList
> = StackScreenProps<CardStackParamList, RouteName>;

const SharedElementStack =
  createSharedElementStackNavigator<CardStackParamList>();

export default function CardsStack() {
  return (
    <NavigationContainer>
      <SharedElementStack.Navigator initialRouteName="CardList">
        <SharedElementStack.Screen
          name="CardList"
          component={CardList}
          options={{
            gestureEnabled: false,
            headerLeftContainerStyle: {
              paddingLeft: 12,
            },
            headerRightContainerStyle: {
              paddingRight: 12,
            },
            headerTitle: "My Wallet",
          }}
        />
        <SharedElementStack.Screen
          name="CardDetail"
          component={CardDetail}
          options={{
            headerTitle: "Card Detail",
            cardStyle: {
              backgroundColor: "#EFEFF4",
            },
          }}
          sharedElements={(route, otherRoute, _showing) => {
            const { item } = route.params;

            // we want to execute shared element transition only in iOS
            // and when transitioning from card list screen
            if (
              otherRoute.name === "CardList" &&
              Platform.OS === "ios"
            ) {
              return [
                {
                  id: item.id,
                },
              ];
            }
          }}
        />
      </SharedElementStack.Navigator>
    </NavigationContainer>
  );
}

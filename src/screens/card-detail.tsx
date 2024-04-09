import React from "react";
import { StyleSheet, View } from "react-native";
// @ts-ignore
import { RowItem, TableView } from "react-native-ios-kit";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { DetailCard } from "../components/detail-card";
import { CardStackScreenProps } from "../cards-stack";

export const CardDetail = ({
  route: {
    params: { item },
  },
}: CardStackScreenProps<"CardDetail">) => {
  const { image, id } = item;
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <View>
        <DetailCard
          scrollY={scrollY}
          image={image}
          sharedElementId={id}
        />
      </View>
      <TableView
        header="Card Information"
        footer="Manage your card settings"
      >
        <RowItem
          icon="card-outline"
          title="Card Number"
          subtitle="**** **** **** 1234"
        />
        <RowItem
          icon="calendar-outline"
          title="Expiration Date"
          subtitle="08/24"
        />
        <RowItem
          icon="person-outline"
          title="Cardholder Name"
          subtitle="John Doe"
        />
      </TableView>

      <TableView header="Recent Transactions">
        <RowItem
          icon="cash-outline"
          title="Grocery Store"
          subtitle="$54.32 - Today"
        />
        <RowItem
          icon="cafe-outline"
          title="Coffee Shop"
          subtitle="$3.50 - Yesterday"
        />
        <RowItem
          icon="restaurant-outline"
          title="Dinner Out"
          subtitle="$45.28 - Last Friday"
        />
      </TableView>

      <TableView
        header="Settings & More"
        footer="Customize your wallet settings"
      >
        <RowItem
          icon="settings-outline"
          title="Payment Settings"
          subtitle="Manage your payment options"
        />
        <RowItem
          icon="notifications-outline"
          title="Notifications"
          subtitle="Transaction alerts and more"
        />
        <RowItem
          icon="information-circle-outline"
          title="About"
          subtitle="Terms, privacy policy, and more"
        />
      </TableView>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#EFEFF4",
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

import { Image, StyleSheet, Platform } from "react-native";
import { useQuery } from "@apollo/client";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";
import { PieChart } from "react-native-chart-kit";
import { gql } from "@/apollo/__generated__";

const GET_PURCHASES = gql(`
  query GetPurchases {
    getPurchases {
      id
      date
      amount
      paymentMethod
      article
      category
    }
  }
`);

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_PURCHASES);

  if (loading) return "Loading";
  if (error) return `Error: ${error.message}`;

  const purchases = data?.getPurchases.map((purchase) => ({
    name: purchase.category,
    amount: purchase.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));
  return (
    <ScrollView>
      <PieChart
        backgroundColor="transparent"
        accessor="amount"
        data={purchases ?? []}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        paddingLeft="15"
        width={400}
        height={400}
      />
    </ScrollView>
  );
}

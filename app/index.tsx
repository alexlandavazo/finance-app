import { useQuery } from "@apollo/client";
import { router } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Ionicons from "@expo/vector-icons/Ionicons";

import { gql } from "@/apollo/__generated__";
import { Fab } from "@/components/ui/fab";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import TransactionCard from "@/components/TransactionCard";

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

interface PurchaseByCategory {
  name: string;
  amount: number;
  color: string;
}

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_PURCHASES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const purchases = data?.getPurchases.map((purchase) => ({
    name: purchase.category,
    amount: purchase.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));
  const purchasesByCategory = data?.getPurchases.reduce(
    (purchasesArray: PurchaseByCategory[], purchase) => {
      const purchaseIndex = purchasesArray.findIndex(
        (p) => p.name === purchase.category,
      );

      if (purchaseIndex === -1) {
        return [
          ...purchasesArray,
          {
            name: purchase.category,
            amount: purchase.amount,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          },
        ];
      }
      purchasesArray[purchaseIndex].amount += purchase.amount;
      return purchasesArray;
    },
    [],
  );

  return (
    <VStack className="h-full">
      <PieChart
        backgroundColor="transparent"
        accessor="amount"
        data={purchasesByCategory ?? []}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        paddingLeft="15"
        width={400}
        height={400}
      />
      <Box className="h-full gap-y-2 rounded-t-xl bg-white p-5">
        <Heading size="md" className="mb-1">
          Compras
        </Heading>
        <FlatList
          data={data?.getPurchases}
          renderItem={({ item: purchase }) => (
            <TransactionCard purchase={purchase} />
          )}
          keyExtractor={(purchase) => purchase.id}
        />
      </Box>
      <Fab
        size="lg"
        className="bottom-4 right-4"
        onPress={() => {
          router.push("/add-purchase");
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </Fab>
    </VStack>
  );
}

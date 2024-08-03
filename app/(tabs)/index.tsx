import { useQuery } from "@apollo/client";

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

interface PurchaseByCategory {
  name: string;
  amount: number;
  color: string;
}

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_PURCHASES);

  if (loading) return "Loading";
  if (error) return `Error: ${error.message}`;

  const purchases = data?.getPurchases.map((purchase) => ({
    name: purchase.category,
    amount: purchase.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));
  const purchasesByCategory = data?.getPurchases.reduce(
    (purchasesArray: PurchaseByCategory[], purchase) => {
      const purchaseIndex = purchasesArray.findIndex(
        (p) => p.name === purchase.category
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
    []
  );

  return (
    <ScrollView>
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
    </ScrollView>
  );
}

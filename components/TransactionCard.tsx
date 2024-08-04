import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Purchase } from "@/apollo/__generated__/graphql";

const TransactionCard = ({ purchase }: { purchase: Purchase }) => {
  console.log(purchase);
  return (
    <Card variant="outline" className="mb-2">
      <Box className="flex-row justify-between">
        <Heading size="sm">{purchase.article}</Heading>
        <Text className="text-md">${purchase.amount}</Text>
      </Box>
      <Box className="flex-row justify-between">
        <Text size="sm">{purchase.category}</Text>
        <Text className="text-sm">{purchase.date.split("T")[0]}</Text>
      </Box>
    </Card>
  );
};

export default TransactionCard;

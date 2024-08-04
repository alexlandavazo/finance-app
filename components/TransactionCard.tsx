import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

const TransactionCard = (props) => {
  return (
    <Card variant="outline">
      <Box className="flex-row justify-between">
        <Heading size="sm">The Algorithm Design Manual</Heading>
        <Text className="text-md">$1435.00</Text>
      </Box>
      <Box className="flex-row justify-between">
        <Text size="sm">Books</Text>
        <Text className="text-sm">28/07/2024 8:30 PM</Text>
      </Box>
    </Card>
  );
};

export default TransactionCard;

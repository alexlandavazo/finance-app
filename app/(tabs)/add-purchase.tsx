import { gql } from "@/apollo/__generated__/";
import { Purchase } from "@/apollo/__generated__/graphql";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Text,
  Select,
  SelectItem,
  Layout,
  IndexPath,
} from "@ui-kitten/components";
import { useState } from "react";

enum PaymentMethod {
  "debit-card" = "Debit Card",
  "credit-card" = "Credit Card",
  "cash" = "Cash",
}

interface IFormInput {
  amount: number;
  article: string;
  category: string;
  paymentMethod: PaymentMethod;
}

const CREATE_PURCHASE = gql(`
  mutation CreatePurchase($purchaseInput: PurchaseInput){
    createPurchase(purchaseInput: $purchaseInput) {
      id,
      amount,
      paymentMethod,
      article,
      date,
    }
  }
`);

export default function TabTwoScreen() {
  const [createPurchase, { loading, error, data }] =
    useMutation(CREATE_PURCHASE);

  const [paymentIndex, setPaymentIndex] = useState(new IndexPath(0));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    ...rest
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const purchaseInput = {
      ...data,
      amount: Number(data.amount),
      category: data.category.replaceAll(" ", "-").toLocaleLowerCase(),
      date: Date.now(),
    };
    createPurchase({
      variables: {
        purchaseInput,
      },
    });
  };
  console.log(rest);
  return (
    <Layout
      style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
    >
      <form>
        <Text>Amount:</Text>
        <Input onChangeText={(value) => setValue("amount", +value)} />
        <Text>Article:</Text>
        <Input onChangeText={(value) => setValue("article", value)} />

        <Text>Category:</Text>
        <Input onChangeText={(value) => setValue("category", value)} />
        <Text>Payment Method</Text>
        <Select
          selectedIndex={paymentIndex}
          value={paymentIndex.row}
          onSelect={(index) => {
            setPaymentIndex(index);
            setValue("paymentMethod", PaymentMethod["debit-card"]);
          }}
        >
          <SelectItem title="Debit Card" />
          <SelectItem title="Credit Card" />
          <SelectItem title="Cash" />
        </Select>
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </form>
      {loading && "Loading"}
      {error && `Error: ${error.message}`}
      {data && JSON.stringify(data, null, 2)}
    </Layout>
  );
}

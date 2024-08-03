import { gql } from "@/apollo/__generated__/";
import { Purchase } from "@/apollo/__generated__/graphql";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const purchaseInput = {
      ...data,
      amount: Number(data.amount),
      category: data.category.replaceAll(" ", "-").toLocaleLowerCase(),
      date: Date.now(),
    };
    console.log(data);
    createPurchase({
      variables: {
        purchaseInput,
      },
    });
  };
  return (
    <ScrollView>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Amount:</label>
        <input {...register("amount")} />
        <label>Article:</label>
        <input {...register("article")} />

        <label>Category:</label>
        <input {...register("category")} />
        <label>Payment Method</label>
        <select {...register("paymentMethod")}>
          <option value="debit-card">Debit Card</option>
          <option value="credit-card">Credit Card</option>
          <option value="cash">Cash</option>
        </select>
        <input type="submit" />
      </form>
      {loading && "Loading"}
      {error && `Error: ${error.message}`}
      {data && JSON.stringify(data, null, 2)}
    </ScrollView>
  );
}

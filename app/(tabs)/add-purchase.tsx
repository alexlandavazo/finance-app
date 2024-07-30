import { gql } from "@/apollo/__generated__/";
import { Purchase } from "@/apollo/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { useForm, SubmitHandler } from "react-hook-form";

enum PaymentMethod {
  "debit-card" = "Debit Card",
  "credit-card" = "Credit Card",
  "cash" = "Cash",
}

interface IFormInput {
  amount: Number;
  article: string;
  category: string;
  paymentMethod: PaymentMethod;
}

export default function TabTwoScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {};
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
    </ScrollView>
  );
}

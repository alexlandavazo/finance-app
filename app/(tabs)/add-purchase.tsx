import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";

import { gql } from "@/apollo/__generated__/";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
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
  return (
    <Box className="flex justify-center px-5">
      <form>
        <Text>Amount:</Text>
        <Input>
          <InputField onChangeText={(value) => setValue("amount", +value)} />
        </Input>
        <Text>Article:</Text>
        <Input>
          <InputField
            onChangeText={(value) => setValue("article", value)}
            placeholder="Enter Text here..."
          />
        </Input>

        <Text>Category:</Text>
        <Input>
          <InputField onChangeText={(value) => setValue("category", value)} />
        </Input>
        <Text>Payment Method</Text>

        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="UX Research" value="ux" />
              <SelectItem label="Web Development" value="web" />
              <SelectItem
                label="Cross Platform Development Process"
                value="Cross Platform Development Process"
              />
              <SelectItem label="UI Designing" value="ui" isDisabled={true} />
              <SelectItem label="Backend Development" value="backend" />
            </SelectContent>
          </SelectPortal>
        </Select>

        {/* <Select
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
        </Select> */}
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </form>
      {loading && "Loading"}
      {error && `Error: ${error.message}`}
      {data && JSON.stringify(data, null, 2)}
    </Box>
  );
}

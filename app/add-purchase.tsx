import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
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
import { gql } from "@/apollo/__generated__/";

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
  const [category, setCategory] = React.useState<string>("");
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

  const handleCategory = (category: string) => {
    setValue("category", category);
    setCategory(category);
  };

  return (
    <Box className="h-full justify-between p-5">
      <VStack className="h-full justify-between gap-y-2">
        <Box className="h-1/2">
          <Box className="mx-10 flex h-full items-center justify-end rounded-b-3xl bg-black">
            <Box className="mb-10 h-14 w-10 rounded-lg bg-white"></Box>
          </Box>
        </Box>
        <Box className="mb-10">
          <Box>
            <Heading size="md" className="mb-1">
              Categorias
            </Heading>
            <ScrollView horizontal={true}>
              <Button
                className={`ml-2 h-12 gap-x-2 rounded-full ${category === "comida" ? "bg-black" : "bg-gray-200"}`}
                onPress={() => {
                  handleCategory("comida");
                }}
              >
                <Ionicons
                  name="fast-food"
                  size={24}
                  color={category === "comida" ? "white" : "black"}
                />
                <ButtonText
                  className={`font-normal ${category === "comida" ? "text-white" : "text-black"}`}
                >
                  Comida
                </ButtonText>
              </Button>
              <Button
                className={`ml-2 h-12 gap-x-2 rounded-full ${category === "libros" ? "bg-black" : "bg-gray-200"}`}
                onPress={() => {
                  handleCategory("libros");
                }}
              >
                <Ionicons
                  name="book"
                  size={24}
                  color={category === "libros" ? "white" : "black"}
                />
                <ButtonText
                  className={`font-normal ${category === "libros" ? "text-white" : "text-black"}`}
                >
                  Libros
                </ButtonText>
              </Button>
              <Button
                className={`ml-2 h-12 gap-x-2 rounded-full ${category === "uso-personal" ? "bg-black" : "bg-gray-200"}`}
                onPress={() => {
                  handleCategory("uso-personal");
                }}
              >
                <Ionicons
                  name="person-sharp"
                  size={24}
                  color={category === "uso-personal" ? "white" : "black"}
                />
                <ButtonText
                  className={`font-normal ${category === "uso-personal" ? "text-white" : "text-black"}`}
                >
                  Uso Personal
                </ButtonText>
              </Button>
            </ScrollView>
          </Box>
          <Box>
            <Heading size="md" className="mb-1">
              Articulo
            </Heading>
            <Input variant="rounded" className="h-12">
              <InputField
                onChangeText={(value) => setValue("article", value)}
                placeholder="Articulo"
              />
            </Input>
          </Box>
          <Box>
            <Heading size="md" className="mb-1">
              Metodo de Pago
            </Heading>

            <Select
              onValueChange={(paymentMethod) => {
                setValue("paymentMethod", paymentMethod as PaymentMethod);
              }}
            >
              <SelectTrigger
                className="h-12 rounded-full"
                variant="outline"
                size="md"
              >
                <SelectInput placeholder="Selecciona un metodo de pago" />
                <SelectIcon className="mr-3" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Debit Card" value="debit-card" />
                  <SelectItem label="Credit Card" value="credit-card" />
                  <SelectItem label="Cash" value="cash" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
          <Box>
            <Heading size="md" className="mb-1">
              Precio
            </Heading>
            <Input variant="rounded" className="h-12">
              <InputField
                onChangeText={(value) => setValue("amount", +value)}
                placeholder="$0.00"
              />
            </Input>
          </Box>
        </Box>
      </VStack>

      <Button
        className="h-12 w-full rounded-full text-white"
        onPress={handleSubmit(onSubmit)}
      >
        Agregar
      </Button>
    </Box>
  );
}

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const client = new ApolloClient({
    uri: process.env.API_URL || "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ApolloProvider client={client}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "semibold",
            },
            headerTitleAlign: "center",
            headerBackButtonMenuEnabled: true,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Lista de Compras",
            }}
          />
          <Stack.Screen
            name="add-purchase"
            options={{
              title: "Agregar Compra",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ApolloProvider>
    </GluestackUIProvider>
  );
}

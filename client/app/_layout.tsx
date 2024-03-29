import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme, Button } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyContextProvider } from "../store/poll-context";
import { AuthContextProvider } from "../store/auth-context";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={"light"} />
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <MyContextProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="post/[id]"
                options={{
                  title: "",
                }}
              />
              <Stack.Screen
                name="(auth)/signin"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/authenticate"
                options={{
                  title: "Authenticate",
                }}
              />
            </Stack>
          </MyContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

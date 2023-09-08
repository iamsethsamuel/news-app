import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Snackbar } from "react-native-paper";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountryType } from "../utils/types";
import { AppContext } from "../utils/context";
import { logError } from "../utils/utils";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme(),
        [country, setCountry] = useState<CountryType>("us"),
        [message, setMessage] = useState<string>("");

    useEffect(() => {
        const storage = new Storage({
            storageBackend: AsyncStorage,
        });

        storage
            .load({ key: "country" })
            .then((value) => {
                if (value) {
                    setCountry(value);
                }
            })
            .catch((err) => {});
    }, []);

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AppContext.Provider
                value={{
                    country: country,
                    colorScheme:colorScheme,
                    showSnackbar: (msg) => {
                        setMessage(msg);
                    },
                    updateCountry: (country: CountryType) => {
                        setCountry(country);
                    },
                }}>
                <Snackbar
                    visible={message.length > 0}
                    onDismiss={() => {
                        setMessage("");
                    }}>
                    {message}
                </Snackbar>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false}}
                    />
                    <Stack.Screen
                        name="newsdetails"
                        options={{ headerShown: false}}
                    />
                </Stack>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

import { createContext } from "react";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType>({
    country: "ng",
    colorScheme: "dark",
    language: "en",
    showSnackbar(msg) {},
    updateCountry(country) {},
    updateLanguage(language) {},
});

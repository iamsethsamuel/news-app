import { createContext } from "react";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType>({ country: "ng", colorScheme: 'dark',showSnackbar(msg) {}, updateCountry(country) {
    
}, });

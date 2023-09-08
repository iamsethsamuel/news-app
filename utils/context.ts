import { createContext } from "react";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType>({ country: "ng", showSnackbar(msg) {}, updateCountry(country) {
    
}, });

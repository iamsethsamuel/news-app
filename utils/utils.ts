import { Dimensions } from "react-native";
import { CountryType } from "./types";

export async function postRequest<T>(url: string, body: object): Promise<T | null> {
    try {
        const f = fetch(
            `${
                process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://jets-server.onrender.com"
            }${url}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: String(localStorage.getItem("sessionID")),
                },
                body: JSON.stringify(body),
            }
        );
        try {
            const response = await f;
            if (response.ok) {
                return response.json() as Promise<T>;
            } else {
                throw new Error("Request failed");
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function getRequest<T>(
    url: string,
    {
        page,
        pageSize,
        country,
        category,
        query,
        language,
    }: {
        page?: number;
        pageSize?: number;
        disenableSnackbar?: boolean;
        country?: CountryType;
        category?: string;
        query?: string;
        language?: string;
    } = {}
): Promise<T | null> {
    const f = fetch(
        `https://newsapi.org/v2${url}?${country ? `country=${country}&` : ""}${
            category ? `category=${category}&` : ""
        }${query ? `q=${query}&` : ""}apiKey=${
            process.env.EXPO_PUBLIC_NEWS_KEY
        }&pageSize=${pageSize || 10}&page=${page || 1}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    try {
        const response = await f;
        if (response.ok) {
            return response.json() as Promise<T>;
        } else {
            throw new Error("Request failed");
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const logError = (e: Error | string) => {
    console.trace(e);
};

export function width(): number {
    return Dimensions.get("window").width;
}

export function height(): number {
    return Dimensions.get("window").height;
}

export function calculateTimePassed(previousDate: string): string {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - new Date(previousDate).getTime();

    const secondsPassed = Math.floor(timeDifference / 1000);
    const minutesPassed = Math.floor(secondsPassed / 60);
    const hoursPassed = Math.floor(minutesPassed / 60);
    const daysPassed = Math.floor(hoursPassed / 24);

    if (daysPassed > 0) {
        return `${daysPassed} day${daysPassed !== 1 ? "s" : ""} ago`;
    } else if (hoursPassed > 0) {
        return `${hoursPassed} hour${hoursPassed !== 1 ? "s" : ""} ago`;
    } else if (minutesPassed > 0) {
        return `${minutesPassed} minute${minutesPassed !== 1 ? "s" : ""} ago`;
    } else {
        return `${secondsPassed} second${secondsPassed !== 1 ? "s" : ""} ago`;
    }
}

const isoCodesString =
    "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza";

// Define an object mapping ISO country codes to country names
export const countryNames = {
    ae: "United Arab Emirates",
    ar: "Argentina",
    at: "Austria",
    au: "Australia",
    be: "Belgium",
    bg: "Bulgaria",
    br: "Brazil",
    ca: "Canada",
    ch: "Switzerland",
    cn: "China",
    co: "Colombia",
    cu: "Cuba",
    cz: "Czech Republic",
    de: "Germany",
    eg: "Egypt",
    fr: "France",
    gb: "United Kingdom",
    gr: "Greece",
    hk: "Hong Kong",
    hu: "Hungary",
    id: "Indonesia",
    ie: "Ireland",
    il: "Israel",
    in: "India",
    it: "Italy",
    jp: "Japan",
    kr: "South Korea",
    lt: "Lithuania",
    lv: "Latvia",
    ma: "Morocco",
    mx: "Mexico",
    my: "Malaysia",
    ng: "Nigeria",
    nl: "Netherlands",
    no: "Norway",
    nz: "New Zealand",
    ph: "Philippines",
    pl: "Poland",
    pt: "Portugal",
    ro: "Romania",
    rs: "Serbia",
    ru: "Russia",
    sa: "Saudi Arabia",
    se: "Sweden",
    sg: "Singapore",
    sk: "Slovakia",
    th: "Thailand",
    tr: "Turkey",
    tw: "Taiwan",
    ua: "Ukraine",
    us: "United States",
    ve: "Venezuela",
    za: "South Africa",
};

// Split the ISO codes string into pairs
const isoCodesArray = isoCodesString.match(/.{1,2}/g);

export const countries: { label: string; value: string }[] = isoCodesArray!.map((code) => ({
    // @ts-ignore
    label: countryNames[code],
    value: code,
}));

const languageCodesString = "ardeenesfrheitnlnoptrusvudzh";

export const languageNames = {
    ar: "Arabic",
    de: "German",
    en: "English",
    es: "Spanish",
    fr: "French",
    hi: "Hindi",
    it: "Italian",
    nl: "Dutch",
    no: "Norwegian",
    pt: "Portuguese",
    ru: "Russian",
    sv: "Swedish",
    zh: "Chinese",
};

const languageCodesArray = languageCodesString.match(/.{1,2}/g);

export const languages: { label: string; value: string }[] = languageCodesArray!.map((code) => ({
    // @ts-ignore
    label: languageNames[code],
    value: code,
}));

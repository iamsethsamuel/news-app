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
    }: {
        page?: number;
        pageSize?: number;
        disenableSnackbar?: boolean;
        country?: CountryType;
        category?: string;
        query?: string;
    } = {}
): Promise<T | null> {
    const f = fetch(
        `https://newsapi.org/v2${url}?${country ? `country=${country}&` : ""}${
            category ? `category=${category}&` : ""
        }${query ? `q=${query}&` : ""}apiKey=${process.env.EXPO_PUBLIC_NEWS_KEY}&pageSize=${pageSize || 10}&page=${
            page || 1
        }`,
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

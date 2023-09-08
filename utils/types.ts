export interface ResType<T> {
    articles: T;
    err?: string;
    totalResults: number;
}
export type ResError = {
    error: string;
};

export type AppContextType = {
    country: CountryType;
    showSnackbar: (msg: string) => void;
    updateCountry: (country: CountryType) => void;
    colorScheme: "light" | "dark"|  null | undefined;
};

export type NewsRes = {
    status: "ok" | "error";
    code?: number;
    message?: string;
    articles?: ArticleType[];
    totalResults: number;
};

export type ArticleType = {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
};

export type CountryType =
    | "ae"
    | "ar"
    | "at"
    | "au"
    | "be"
    | "bg"
    | "br"
    | "ca"
    | "ch"
    | "cn"
    | "co"
    | "cu"
    | "cz"
    | "de"
    | "eg"
    | "fr"
    | "gb"
    | "hk"
    | "hu"
    | "id"
    | "ie"
    | "il"
    | "in"
    | "it"
    | "jp"
    | "kr"
    | "lt"
    | "lv"
    | "ma"
    | "mx"
    | "my"
    | "ng"
    | "nl"
    | "no"
    | "nz"
    | "ph"
    | "pl"
    | "pt"
    | "ro"
    | "rs"
    | "ru"
    | "sa"
    | "se"
    | "sg"
    | "th"
    | "tr"
    | "tw"
    | "ua"
    | "us"
    | "ve"
    | "za"
    | "";

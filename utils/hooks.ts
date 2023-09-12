import { useContext, useEffect, useState } from "react";
import { CountryType, NewsRes, ResType } from "./types";
import { getRequest, logError, postRequest } from "./utils";
import { AppContext } from "./context";

export function useRequest<T>(
    path: string,
    {
        page,
        pageSize,
        disenableSnackbar,
        category,
        query,
    }: {
        page?: number;
        pageSize?: number;
        disenableSnackbar?: boolean;
        country?: CountryType;
        category?: string;
        query?: string;
        language?: string;

    } = {}
): { data: T | undefined; isLoading: boolean; error: string | undefined } {
    const { showSnackbar, country, language } = useContext(AppContext),
        [data, setData] = useState<T>(),
        [loading, setLoading] = useState(true),
        [errorState, setErrorState] = useState<string | undefined>();

    useEffect(() => {
        getRequest<NewsRes>(path, {
            country: country,
            pageSize: pageSize ?? 20,
            page: page,
            category: category,
            query: query,
            language: language
        })
            .then((res) => {
                setLoading(false);
                if (res?.status === "ok") {
                    //@ts-ignore
                    setData(res?.articles);
                } else {
                    if (disenableSnackbar == true) {
                        showSnackbar(String(res?.message));
                    }
                    setErrorState(String(res));
                }
            })
            .catch((err) => {
                setLoading(false);

                logError(err);
                showSnackbar("Sorry, an error occurred");
            });
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, page, category, query, language, country]);

    return { data, isLoading: loading, error: errorState };
}

import { Card } from "react-native-paper";
import { Text, View } from "../Themed";
import { Button, Image, StyleSheet, TouchableHighlight } from "react-native";
import { calculateTimePassed, height, width } from "../../utils/utils";
import { styles } from "../../utils/styles";
import { useEffect, useState } from "react";
import { ArticleType } from "../../utils/types";
import { useRequest } from "../../utils/hooks";
import * as Progress from "react-native-progress";
import { Link, useRouter } from "expo-router";

export default function BreakingNews({ atBottom, setAtBottom }: { atBottom: boolean; setAtBottom: any }) {
    const [page, setPage] = useState(1),
        router = useRouter(),
        {
            data: articlesList,
            isLoading,
            error,
        } = useRequest<ArticleType[]>("/top-headlines", { page: page, country: "" }),
        [articles, setArticles] = useState<ArticleType[]>(articlesList ?? []);

    useEffect(() => {
        if (atBottom) {
            if (isLoading) {
                return;
            }

            setPage((prev) => prev + 1);
            setAtBottom(false);
        }
    }, [atBottom]);

    useEffect(() => {
        if (articlesList && articlesList.length > 0) {
            setArticles((prev) => [...prev, ...articlesList!]);
        }
    }, [articlesList]);

    useEffect(() => {
        if (!isLoading) {
        }
    }, [articlesList]);

    if (!articlesList) {
        return (
            <View style={{ flex: 1, width: width(), height: height() }}>
                <Progress.CircleSnail color={["red", "green", "blue"]} />
            </View>
        );
    }

    return (
        <View style={{ ...styles.gridRow, marginHorizontal: 10, gap: 10, marginBottom: height() / 2 }}>
            <Text style={{ ...styles.title, fontSize: 20, fontWeight: "900" }}>Breaking News</Text>

            {articles.map((article, index) => (
                <View key={index} style={{ ...localStyles.card, ...styles.gridItem2 }}>
                    {article.urlToImage ? (
                        <TouchableHighlight onPress={() => router.push(article.url as `http${string}`)}>
                            <Image source={{ uri: article.urlToImage || "" }} style={localStyles.image} />
                        </TouchableHighlight>
                    ) : (
                        <View style={localStyles.image}></View>
                    )}
                    <Text style={styles.title}>{article.title?.substring(0, 50)}</Text>
                    <Text style={styles.subtitle}>{article.content?.substring(0, 100)}</Text>
                    <Text style={styles.subtitle}>{calculateTimePassed(article.publishedAt)}</Text>
                </View>
            ))}
        </View>
    );
}

const localStyles = StyleSheet.create({
    image: {
        borderRadius: 20,
        aspectRatio: 21 / 19,
        // height: height() / 3,
        width: width() / 2 - 30,
    },
    card: {
        marginVertical: 10,
        // marginHorizontal: 10,
    },
});

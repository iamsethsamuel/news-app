import { ScrollView } from "react-native-gesture-handler";
import { ArticleType } from "../utils/types";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { useRouter } from "expo-router";
import { calculateTimePassed, height, width } from "../utils/utils";
import { styles } from "../utils/styles";
import { Text } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

export default function Search({ articles }: { articles: ArticleType[] }) {
    const router = useRouter();

    if (!articles) {
        return (
            <View style={{ flex: 1, width: width(), height: height() }}>
                <Progress.CircleSnail color={["red", "green", "blue"]} />
            </View>
        );
    }

    return (
        <View style={{ marginTop: 50 }}>
            {articles.map((article, index) => (
                <View key={"article" + index} style={{ ...styles.gridRow, marginTop: 10 }}>
                    {article.urlToImage ? (
                        <TouchableHighlight onPress={() => router.push(article.url as `http${string}`)}>
                            <Image source={{ uri: article.urlToImage || "" }} style={localStyles.image} />
                        </TouchableHighlight>
                    ) : (
                        <View style={localStyles.image}></View>
                    )}
                    <View style={styles.gridItem2}>
                        <Text style={styles.title}>{article.title?.substring(0, 100)}</Text>
                        <View style={styles.gridRow}>
                            <Text style={styles.subtitle}>{calculateTimePassed(article.publishedAt)}</Text>
                            <View style={{ ...styles.gridRow, alignItems: 'center'  }}>
                                <FontAwesome
                                    name="user"
                                    size={15}
                                    style={{  marginRight: 5, width: "13%", }}
                                    color="#888888"
                                />
                                <Text
                                    style={{
                                        ...styles.subtitle,
                                        width: '70%',
                                    }}>
                                    {article.author?.substring(0, 9)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const localStyles = StyleSheet.create({
    image: {
        borderRadius: 20,
        aspectRatio: 21 / 19,
        width: width() / 2 - 30,
    },
    card: {
        marginVertical: 10,
        // marginHorizontal: 10,
    },
});

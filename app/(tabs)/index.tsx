import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Carousel from "../../components/home/Carousel";
import { useRequest } from "../../utils/hooks";
import { ArticleType, NewsRes, ResType } from "../../utils/types";
import { height, width } from "../../utils/utils";
import * as Progress from "react-native-progress";
import BreakingNews from "../../components/home/BreakingNews";
import { useState } from "react";

export default function Home() {
    const [atBottom, setAtBottom] = useState(false);

    const { data: articles, isLoading, error } = useRequest<ArticleType[]>("/top-headlines");

    if (isLoading) {
        return (
            <View style={{ ...styles.container, flex: 1, width: width(), height: height() }}>
                <Progress.CircleSnail color={["red", "green", "blue"]} />
            </View>
        );
    }

    if (error || !articles) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={(e) => {
                    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
                    // Calculate the position from the bottom
                    const positionFromBottom = contentSize.height - contentOffset.y - layoutMeasurement.height;

                    // checks if offeset is close to the bottom of the screen
                    if (positionFromBottom <= height() / 4) {
                        setAtBottom(true);
                    }
                }}>
                <Carousel articles={articles} />
                <BreakingNews atBottom={atBottom} setAtBottom={setAtBottom} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginHorizontal: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});

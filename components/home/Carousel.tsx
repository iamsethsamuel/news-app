import { ReactNode, useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { ArticleType } from "../../utils/types";
import { Link } from "expo-router";
import { styles } from "../../utils/styles";
import Chip from "../Chip";
import { height, width } from "../../utils/utils";
import { Text } from "../Themed";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function Carousel({ articles }: { articles: ArticleType[] }) {
    const [page, setPage] = useState(0),
        ref = useRef<PagerView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPage((page) => {
                if (page === articles.length - 1) {
                    return 0;
                }
                return page + 1;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        ref.current?.setPage(page);
    }, [page]);

    return (
        <View>
            <PagerView ref={ref} style={localStyles.viewPager} initialPage={0}>
                {articles.map((article, index) => (
                    <View style={localStyles.page} key={String(index)}>
                        {article.urlToImage ? (
                            page === index && (
                                <Animatable.Image
                                    animation="fadeIn"
                                    easing="ease-in"
                                    duration={500}
                                    source={{ uri: article.urlToImage || "" }}
                                    style={localStyles.image}
                                />
                            )
                        ) : (
                            <View style={localStyles.image}></View>
                        )}
                        {page === index && (
                            <LinearGradient
                                colors={["rgba(255,255,255,0.01)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8099614845938375)"]}
                                style={localStyles.detailsContainer}>
                                <Animatable.View
                                    animation="lightSpeedIn"
                                    duration={500}
                                    direction="alternate"
                                    style={{ ...localStyles.detailsContainer, top: -40 }}>
                                    <Chip title={article.source.name} />
                                    <Text style={localStyles.title}>{article.title}</Text>
                                    <Link href={"/(tabs)/explore"}>
                                        <Text style={localStyles.learn}>Learn More</Text>{" "}
                                        <FontAwesome
                                            style={{ ...localStyles.learn, marginLeft: 30 }}
                                            name="arrow-right"
                                        />
                                    </Link>
                                </Animatable.View>
                            </LinearGradient>
                        )}
                    </View>
                ))}
            </PagerView>
        </View>
    );
}

const localStyles = StyleSheet.create({
    viewPager: {
        width: Dimensions.get("window").width,
        height: height() / 2 - 30,
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: Dimensions.get("window").width,
        height: height() / 2 - 50,
        borderRadius: 30,
        objectFit: "contain",
    },
    detailsContainer: {
        top: -160,
        width: width(),
        height: height() / 5,
        padding: 20,
        boxShadow: "10px 10px 5px #888",
        borderRadius: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginTop: 10,
        marginBottom: 10,
    },
    learn: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        marginTop: 10,
        marginBottom: 30,
    },
});

import { StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import { styles } from "../../utils/styles";
import { ScrollView } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import TextField from "../../components/TextField";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { articlesList, catergories } from "../../utils/data";
import { Button } from "react-native-paper";
import { useRequest } from "../../utils/hooks";
import Search from "../../components/Search";
import { ArticleType } from "../../utils/types";
import { AppContext } from "../../utils/context";

export default function Expore() {
    // const ;

    const { colorScheme } = useContext(AppContext),
        [search, setSearch] = useState(""),
        [selectedCategory, setCategory] = useState("General"),
        { data: articles } = useRequest<ArticleType[]>("/top-headlines", { category: selectedCategory, query: search });
    return (
        <View>
            <ScrollView style={{ margin: 20 }}>
                <Text style={{ ...styles.title, fontSize: 25, fontWeight: "900" }}>Discover</Text>
                <Text style={{ ...styles.subtitle, marginBottom: 30 }}>News from all over the world</Text>
                <TextField
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                    prefix={<FontAwesome size={20} name="search" fontSize={20} color={"#888888"} />}
                    suffix={<FontAwesome size={20} name="filter" color={"#888888"} />}
                />
                <ScrollView horizontal style={{ borderBottomColor: "#888888", borderBottomWidth: 0.5 }}>
                    {catergories.map((category) => (
                        <Button
                            key={category}
                            style={{}}
                            onPress={() => {
                                setCategory(category);
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "900",
                                    paddingBottom: 5,
                                    color:
                                        selectedCategory === category
                                            ? colorScheme === "light"
                                                ? "black"
                                                : "white"
                                            : "#888888",
                                    borderBottomColor:
                                        selectedCategory === category
                                            ? colorScheme === "light"
                                                ? "black"
                                                : "white"
                                            : "transparent",
                                    borderBottomWidth: selectedCategory === category ? 1 : 0.5,
                                }}>
                                {category}
                            </Text>
                        </Button>
                    ))}
                </ScrollView>
                <Search articles={articles || []}></Search>
            </ScrollView>
        </View>
    );
}

const localStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});

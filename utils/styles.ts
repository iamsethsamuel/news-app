import { StyleSheet } from "react-native";
import { width } from "./utils";

export const styles = StyleSheet.create({
    gridRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "space-between",
    },
    gridItem2: {
        aspectRatio: 1,
        width: "45%",
    },
    title: {
        width: width() / 2,
        textAlign: "left",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 20,
    },
    subtitle: {
        color: "#888888",
        fontSize: 13,
        marginRight: 10,
        textAlign: "left",
        marginTop: 5,
    },
    inputField: {
        backgroundColor: "rgba(128,128,128,.2)",
        padding: 10,
        paddingLeft: 40,
        borderRadius: 10,
    },
});

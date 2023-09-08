import { styles } from "../utils/styles";
import React, { ReactNode, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type TextFieldProps = {
    prefix?: ReactNode;
    suffix?: ReactNode;
} & TextInput["props"];

export default function TextField(props: TextFieldProps) {
    const [search, setSearch] = useState("");

    return (
        <View style={props.style}>
            {props.prefix && <View style={localStyles.prefix}>{props.prefix}</View>}
            <TextInput
                style={{ ...styles.inputField, marginVertical: 10, position: "relative",  }}
                placeholder="Search"
                onChangeText={setSearch}
                value={search}
                {...props}
            />
            {props.suffix && <View style={localStyles.suffix}>{props.suffix}</View>}
        </View>
    );
}

const localStyles = StyleSheet.create({
    prefix: {
        position: "absolute",
        top: "35%",
        left: 10,
    },
    suffix: {
        position: "absolute",
        top: "35%",
        right: 10,
    },
});

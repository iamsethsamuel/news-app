import { styles } from "../utils/styles";
import React, { ReactNode, useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AppContext } from "../utils/context";

type TextFieldProps = {
    prefix?: ReactNode;
    suffix?: ReactNode;
} & TextInput["props"];

export default function TextField(props: TextFieldProps) {
    const {colorScheme} = useContext(AppContext),[search, setSearch] = useState("");

    return (
        <View style={props.style}>
            {props.prefix && <View style={localStyles.prefix}>{props.prefix}</View>}
            <TextInput
                style={{ ...styles.inputField, marginVertical: 10, position: "relative", color: colorScheme === 'dark'? 'white': '#888888' }}
                placeholderTextColor={colorScheme === 'dark'? 'white': '#888888'}
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

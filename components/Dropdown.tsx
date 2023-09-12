import { FontAwesome } from "@expo/vector-icons";
import React, { FC, ReactElement, useContext, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    StyleProp,
    ViewStyle,
    ScrollView,
    TextStyle,
} from "react-native";
import { Text, View } from "./Themed";
import { styles } from "../utils/styles";
import { AppContext } from "../utils/context";

interface Props {
    label: string;
    data: Array<Item>;
    onSelect: (item: Item) => void;
    defaultValue?: Item;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

type Item = { label: string; value: string };

const Dropdown: FC<Props> = ({ label, data, onSelect, defaultValue, style, labelStyle }) => {
    const { colorScheme } = useContext(AppContext),
        DropdownButton = useRef<TouchableOpacity | null>(null);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<Item | null | undefined>(defaultValue);
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        DropdownButton.current?.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
            setDropdownTop(py);
        });
        setVisible(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                style={{ maxHeight: "50%", height: "50%" }}
                onDismiss={() => {
                    setVisible(false);
                }}>
                <ScrollView
                    style={{
                        top: dropdownTop,
                        backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
                        height: "70%",
                    }}>
                    {data.map((item) => (
                        <TouchableOpacity key={item.value} style={localStyles.item} onPress={() => onItemPress(item)}>
                            <Text style={labelStyle}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Modal>
        );
    };

    return (
        <TouchableOpacity ref={DropdownButton} style={style} onPress={toggleDropdown}>
            {renderDropdown()}
            <Text style={labelStyle}>
                {/* @ts-ignore */}
                {(!!selected && selected.label) || label}
            </Text>
            <FontAwesome
                style={localStyles.icon}
                color={colorScheme === "dark" ? "white" : "grey"}
                type="font-awesome"
                name="chevron-down"
            />
        </TouchableOpacity>
    );
};

const localStyles = StyleSheet.create({
    buttonText: {
        flex: 1,
        textAlign: "center",
    },
    icon: {
        marginRight: 10,
        marginTop: 10
    },
    dropdown: {
        position: "absolute",
        width: "100%",
        shadowColor: "#000000",
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    overlay: {
        width: "100%",
        height: "100%",
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default Dropdown;

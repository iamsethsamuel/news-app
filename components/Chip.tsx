import { Link } from "expo-router";
import { Text, View } from "react-native";
import { BlurView } from "expo-blur";

export default function Chip({ title }: { title: string }) {
    return (
        <Link href={"/(tabs)/explore"}>
            <View style={styles.chip}>
                <Text style={{ fontWeight: "bold", marginHorizontal: 10, marginVertical: 5, color: "white" }}>
                    {title}
                </Text>
            </View>
        </Link>
    );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    chip: {
        backgroundColor: "rgba(255,255,255,.5)",
        borderRadius: 20,
        flex: 1,
    },
});

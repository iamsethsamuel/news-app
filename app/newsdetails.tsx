import { WebView } from "react-native-webview";
import { View } from "../components/Themed";

export default function NewsDetails({ link }: { link: string }) {
    return <View>
        <WebView source={{ uri: link,  }} style={{flex: 1}} useWebView2={true} />
    </View>;
}

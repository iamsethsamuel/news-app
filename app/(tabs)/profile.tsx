import { useContext, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { Text, View } from "../../components/Themed";
import { styles } from "../../utils/styles";
import { countries, countryNames, languageNames, languages } from "../../utils/utils";
import { AppContext } from "../../utils/context";
import { CountryType } from "../../utils/types";

export default function ProfilePage() {
    const { country, updateCountry, language, updateLanguage } = useContext(AppContext)

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View>
                <Dropdown
                    label="Select Country"
                    style={styles.gridRow}
                    data={countries}
                    labelStyle={{fontSize: 15}}
                    // @ts-ignore
                    defaultValue={{ label: countryNames[country], value: country }}
                    onSelect={(sel) => {
                        updateCountry(sel.value as CountryType);
                    }}
                />
            </View>
            {/* <View>
                <Dropdown
                    label="Select Language"
                    data={languages}
                    style={{ ...styles.gridRow, marginVertical: 10 }}
                    // @ts-ignore
                    defaultValue={{ label: languageNames[language], value: language }}
                    onSelect={(sel) => {
                        updateLanguage(sel.value);
                    }}
                />
            </View> */}
        </View>
    );
}

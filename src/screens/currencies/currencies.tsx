import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootStackScreenProps } from "../../types/navigation";
import { useCurrency } from "../../providers/ContextProvider";

export const CurrenciesScreen: React.FC<RootStackScreenProps<"Currencies">> = ({
  navigation,
}) => {
  const { styles, palette, layout } = useStyles();
  const [clicked, setClicked] = useState(Boolean);
  const [searchInput, setSearchInput] = useState("");
  const { currency, setCurrency } = useCurrency();

  const Currencies = [
    { key: "BTC", value: "₿", label: "Bitcoin" },
    { key: "ETH", value: "Ξ", label: "Ethereum" },
    { key: "GBP", value: "£", label: "British Pound" },
    { key: "CNY", value: "¥", label: "Canadian Dollar" },
    { key: "AFN", value: "؋", label: "Afghan Afghani" },
    { key: "EURO", value: "€", label: "Euro" },
    { key: "US Dollar", value: "$", label: "Unites State Dollar" },
    { key: "NGN", value: "₦", label: "Nigeria" },
  ];

  const handleSelect = (data: typeof currency) => {
    setCurrency(data);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <FontAwesome
            name="search"
            size={20}
            color={palette.primary}
            style={{ justifyContent: "flex-start", marginLeft: 8 }}
          />
          <TextInput
            value={searchInput}
            autoCorrect={false}
            style={styles.search}
            onChangeText={setSearchInput}
            placeholder="Search Currency"
            onFocus={() => {
              setClicked(true);
            }}
          />
        </View>
        {clicked && (
          <FontAwesome
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: palette.homeBackground,
        }}
      >
        <Text style={styles.currencies}>All currencies</Text>
      </View>

      <View style={styles.currencyContainer}>
        {Currencies.map((currency, index) => (
          <TouchableOpacity
            style={styles.card}
            key={index}
            activeOpacity={0.7}
            onPress={() => handleSelect(currency)}
          >
            <View style={styles.innerCardSyle}>
              <Text style={styles.currency}>{currency.key}</Text>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.title}>{currency.value}</Text>
                <Text style={styles.label}>{currency.label}</Text>
              </View>
            </View>

            <FontAwesome
              name="star"
              size={20}
              style={styles.checkIcon}
              color={clicked ? palette.favorite : palette.grey}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const useStyles = makeUseStyles(({ layout, palette, fonts, edgeInsets }) => ({
  container: {
    paddingVertical: layout.gutter * 2,
    // paddingHorizontal: layout.gutter * 2,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "flex-start",
    paddingHorizontal: layout.gutter,
  },
  searchWrapper: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: palette.homeBackground,
  },
  search: {
    color: palette.text,
    fontSize: fonts.size.md,
    paddingHorizontal: layout.gutter,
    fontFamily: fonts.variants.regular,
  },
  currencies: {
    color: palette.text,
    fontSize: fonts.size.md,
    textTransform: "uppercase",
    fontWeight: fonts.weight.semi,
    paddingVertical: layout.gutter + 1,
    paddingHorizontal: layout.gutter,
    fontFamily: fonts.variants.regular,
  },
  currencyContainer: {
    // backgroundColor: palette.dateBackground,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: layout.gutter,
    paddingVertical: layout.gutter * 2,
  },
  innerCardSyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currency: {
    color: palette.grey,
    alignItems: "center",
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.bold,
  },
  title: {
    color: palette.text,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.full,
  },
  label: {
    color: palette.grey,
    fontSize: fonts.size.s,
  },
  checkIcon: {
    borderRadius: 50,
  },
}));

import React, { Fragment, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Keyboard,
  TextInput,
  FlatListProps,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { Checkbox } from "../../component/checkbox";
import { useCurrency } from "../../hooks/useCurrency";
import { CurrencyInterface } from "../../types/types";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootStackScreenProps } from "../../types/navigation";
import { useContext } from "../../providers/ContextProvider";

export const CurrenciesScreen: React.FC<RootStackScreenProps<"Currencies">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();
  const [clicked, setClicked] = useState(false);
  const { currency, setCurrency } = useContext();
  const [searchInput, setSearchInput] = useState("");
  const { error, isLoading, currencies } = useCurrency();

  const handleSelect = (data: typeof currency) => {
    setCurrency(data);
    navigation.goBack();
  };

  const renderItem: FlatListProps<CurrencyInterface>["renderItem"] = ({
    item,
  }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.innerCardStyle}>
        <Text style={styles.currency}>{item.flag}</Text>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.label}>{item.country}</Text>
        </View>
      </View>

      <Checkbox isChecked={currency?.country === item.country} />
    </TouchableOpacity>
  );

  const ListHeaderComponent: FlatListProps<CurrencyInterface>["ListHeaderComponent"] =
    useCallback(
      () => (
        <Fragment>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <FontAwesome
                size={18}
                name="search"
                color={palette.primary}
                style={{ justifyContent: "flex-start", marginLeft: 8 }}
              />
              <TextInput
                value={searchInput}
                autoCorrect={false}
                style={styles.search}
                placeholder="Search Currency"
                onChangeText={setSearchInput}
                onFocus={() => setClicked(true)}
              />

              {clicked && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    Keyboard.dismiss();
                    setClicked(false);
                    setSearchInput("");
                  }}
                >
                  <FontAwesome name="close" color={palette.hairlineColor} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.currencies}>All currencies</Text>
          </View>
        </Fragment>
      ),
      []
    );

  const ListEmptyComponent: FlatListProps<CurrencyInterface>["ListEmptyComponent"] =
    () => {
      if (isLoading) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={palette.text} />
          </View>
        );
      }

      if (error) {
        return (
          <View style={styles.loaderContainer}>
            <Text style={styles.error}>{error.message}</Text>
          </View>
        );
      }

      return null;
    };

  return (
    <FlatList
      data={currencies}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.container}
    />
  );
};

const useStyles = makeUseStyles(({ layout, palette, fonts, edgeInsets }) => ({
  container: {
    paddingTop: layout.gutter,
    paddingBottom: edgeInsets.bottom,
    paddingVertical: layout.gutter * 2,
  },
  searchContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: layout.gutter,
  },
  searchWrapper: {
    flex: 1,
    height: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: palette.homeBackground,
  },
  search: {
    flex: 1,
    height: "100%",
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
  header: {
    borderRadius: 2,
    flexDirection: "row",
    backgroundColor: palette.homeBackground,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.gutter,
  },
  innerCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currency: {
    color: palette.grey,
    alignItems: "center",
    fontSize: fonts.size.xxlg * 2,
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
  cancelButton: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: layout.gutter / 2,
    backgroundColor: palette.dateBackground,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: layout.screen.height - layout.screen.width,
  },
  error: {
    marginTop: 4,
    color: palette.text,
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.semi,
  },
}));

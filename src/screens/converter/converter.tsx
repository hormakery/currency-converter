import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../types/navigation";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import { useContext } from "../../providers/ContextProvider";
import { useCurrency } from "../../hooks/useCurrency";

const CLICK_BUTTONS = [
  { label: "1", margin: 0 },
  { label: "2", margin: 2 },
  { label: "3", margin: 0 },
  { label: "4", margin: 0 },
  { label: "5", margin: 2 },
  { label: "6", margin: 0 },
  { label: "7", margin: 0 },
  { label: "8", margin: 2 },
  { label: "9", margin: 0 },
  { label: ".", margin: 0 },
  { label: "0", margin: 2 },
];

export const Converter: React.FC<RootTabScreenProps<"Converter">> = ({
  navigation,
}) => {
  const { currency } = useContext();
  const { error, isLoading, currencies } = useCurrency();

  const { styles, palette, fonts } = useStyles();
  const [state, setState] = useState({
    to: { amount: "98.01", label: "Euro", symbol: "€" },
    from: { amount: "100", label: "US Dollar", symbol: "$" },
  });
  const currencyRef = useRef<keyof typeof state>("to");

  useEffect(() => {
    if (currency && currencyRef.current) {
      const key = currencyRef.current;
      setState({ ...state, [key]: { ...state[key], ...currency } });
    }
  }, [currency, currencyRef]);

  const handlePress = (title: keyof typeof state) => {
    currencyRef.current = title;
    navigation.dispatch(
      CommonActions.navigate({
        name: "Root",
        params: { screen: "Currencies", params: { title } },
      })
    );
  };

  const [toUnit, decimalUnit] = state.to.amount.split(".");

  const handleSwitch = () => {
    setState({ ...state, from: state.to, to: state.from });
  };

  const handleChange = (amount: string) => {
    if (state.from.amount.includes(".") && amount === ".") {
      return;
    }

    setState({
      ...state,
      from: { ...state.from, amount: `${state.from.amount}${amount}` },
    });
  };

  const handleClear = () => {
    setState({
      ...state,
      from: { ...state.from, amount: state.from.amount.slice(0, -1) },
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerTitle}>
        <Text style={styles.title}>Converter</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.date}>{getCurrentDate()}</Text>
          <MaterialCommunityIcons
            size={18}
            style={styles.calender}
            color={palette.primary}
            name="calendar"
          />
        </View>
      </View>

      <View>
        <View style={styles.priceWrapper}>
          <TouchableOpacity
            style={styles.currencyWrapper}
            onPress={() => handlePress("from")}
          >
            <Text style={styles.currency}>{state.from.label} </Text>
            <MaterialCommunityIcons
              size={20}
              name="chevron-down"
              style={styles.calender}
              color={palette.primary}
            />
          </TouchableOpacity>

          <View style={styles.currencyWrapper}>
            <Text style={styles.currency}>{state.from.symbol}</Text>
            <TextInput
              value={state.from.amount}
              showSoftInputOnFocus={false}
              style={[styles.price, styles.input]}
            />
          </View>
        </View>

        <View style={styles.priceWrapper}>
          <TouchableOpacity
            style={styles.currencyWrapper}
            onPress={() => handlePress("to")}
          >
            <Text style={styles.currency}>{state.to.label}</Text>
            <MaterialCommunityIcons
              size={20}
              name="chevron-down"
              style={styles.calender}
              color={palette.primary}
            />
          </TouchableOpacity>

          <View style={styles.currencyWrapper}>
            <Text style={styles.currency}>{state.to.symbol}</Text>
            <Text style={styles.price}>
              {toUnit}
              {decimalUnit && (
                <Text style={[styles.price, styles.decimal]}>
                  .{decimalUnit}
                </Text>
              )}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.icons}
          onPress={handleSwitch}
        >
          <FontAwesome
            size={20}
            name="long-arrow-down"
            color={palette.primary}
          />
          <FontAwesome size={20} name="long-arrow-up" color={palette.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {CLICK_BUTTONS.map(({ label, margin }) => (
          <TouchableOpacity
            key={label}
            activeOpacity={0.8}
            onPress={() => handleChange(label)}
            style={[styles.button, { marginHorizontal: margin }]}
          >
            <Text style={[styles.price, styles.buttonText]}>{label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={handleClear}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Ionicons
            size={25}
            name="return-up-back"
            color={palette.primary}
            style={{ fontWeight: fonts.weight.bold }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const useStyles = makeUseStyles(({ layout, palette, fonts, edgeInsets }) => ({
  container: {
    paddingVertical: layout.gutter * 2,
    paddingHorizontal: layout.gutter * 2,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: edgeInsets.bottom,
    justifyContent: "space-between",
  },
  title: {
    letterSpacing: 1.1,
    color: palette.text,
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.full,
    fontFamily: fonts.variants.bold,
  },
  date: {
    opacity: 0.7,
    color: palette.text,
    fontSize: fonts.size.md,
    fontFamily: fonts.variants.regular,
  },
  calender: {
    marginLeft: 10,
  },
  priceWrapper: {
    marginBottom: 3,
    borderRadius: layout.gutter / 2,
    paddingVertical: layout.gutter,
    paddingHorizontal: layout.gutter,
    backgroundColor: palette.homeBackground,
  },
  currencyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.gutter,
  },
  currency: {
    opacity: 0.6,
    color: palette.text,
    fontSize: fonts.size.md,
  },
  price: {
    marginLeft: 10,
    color: palette.text,
    fontSize: fonts.size.xxlg,
  },
  buttonText: {
    marginLeft: 0,
  },
  decimal: {
    fontSize: fonts.size.lg,
  },
  icons: {
    top: 75,
    width: 60,
    right: 50,
    zIndex: 10,
    height: 60,
    borderWidth: 2,
    position: "absolute",
    flexDirection: "row",
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: palette.background,
    backgroundColor: palette.homeBackground,
  },
  buttonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: layout.gutter * 3,
  },
  button: {
    borderRadius: 3,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.homeBackground,
    width: (layout.screen.width - layout.gutter * 2) / 3.3,
    height: (layout.screen.width - layout.gutter * 2) / 4.5,
  },
  input: {},
  dropdown: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: palette.text,
  },
}));

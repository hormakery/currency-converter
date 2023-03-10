import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Parser } from "expr-eval";
import fonts from "../../constants/fonts";
import layouts from "../../constants/layouts";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../types/navigation";

export const Calculator: React.FC<RootTabScreenProps<"Calculator">> = ({}) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(0);
  const { styles, palette } = useStyles();

  const BUTTONS = useMemo(
    () => [
      {
        label: "C",
        margin: 2,
        bg: palette.dateBackground,
        style: { color: palette.primary },
      },
      { label: "+/-", margin: 0, bg: palette.dateBackground },
      { label: "%", margin: 2, bg: palette.dateBackground },
      { label: "÷", margin: 0, bg: palette.dateBackground },
      { label: "7", margin: 2, bg: palette.homeBackground },
      { label: "8", margin: 0, bg: palette.homeBackground },
      { label: "9", margin: 2, bg: palette.homeBackground },
      { label: "x", margin: 0, bg: palette.dateBackground },
      { label: "4", margin: 2, bg: palette.homeBackground },
      { label: "5", margin: 0, bg: palette.homeBackground },
      { label: "6", margin: 2, bg: palette.homeBackground },
      { label: "-", margin: 0, bg: palette.dateBackground },
      { label: "1", margin: 2, bg: palette.homeBackground },
      { label: "2", margin: 0, bg: palette.homeBackground },
      { label: "3", margin: 2, bg: palette.homeBackground },
      { label: "+", margin: 0, bg: palette.dateBackground },
      { label: ".", margin: 2, bg: palette.homeBackground },
      { label: "0", margin: 0, bg: palette.homeBackground },
    ],
    [palette]
  );

  const handleClear = () => {
    setText(``);
    setResult(0);
  };

  const handleNumberOperation = (label: string) => {
    let innerText = text;

    const splits = innerText.split(" ");
    const lastNums = splits[splits.length - 1] || "";

    if (lastNums.length === 12) {
      return;
    }

    if (lastNums.includes(".") && label === ".") {
      return;
    }

    // handle decimals as first letters
    if (!lastNums && label === ".") {
      innerText = `${innerText}0`;
    }

    if (innerText.includes("=")) {
      setText(`${label}`);
      setResult(0);
    } else {
      setText(`${innerText}${label}`);
    }
  };

  const handleSymbolOperation = (label: string) => {
    const symbols = ["-", "x", "+", "%", "÷"];

    if (!symbols.includes(label)) {
      return false;
    }

    if (text.includes("=")) {
      setResult(0);
      setText(`${result} ${label} `);
    } else {
      const lastChar = text.charAt(text.length - 2);
      const isSymbol = symbols.includes(lastChar);
      if (isSymbol) {
        setText(`${text.slice(0, -3)} ${label} `);
      } else {
        setText(`${text || 0} ${label} `);
      }
    }

    return true;
  };

  const handleChange = (label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (handleSymbolOperation(label)) {
      return;
    }

    const caseFun = {
      C: handleClear,
      "+/-": () => setText(`- ${text || 0}`),
    };

    const key = label as keyof typeof caseFun;
    caseFun[key] ? caseFun[key]() : handleNumberOperation(label);
  };

  const handleSum = () => {
    if (text.includes("=")) {
      return;
    }

    const sum = text.replaceAll("x", "*").replaceAll("÷", "/");

    setResult(Parser.evaluate(sum));
    setText(`${text} = `);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Calculator</Text>

      <View style={styles.calculatorOutput}>
        <TextInput
          value={text}
          style={styles.input}
          showSoftInputOnFocus={false}
        />
        <Text style={styles.inputSum}>{result}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {BUTTONS.map(({ label, margin, bg, style }) => (
          <TouchableOpacity
            key={label}
            activeOpacity={0.8}
            onPress={() => handleChange(label)}
            style={[
              styles.button,
              { marginHorizontal: margin, backgroundColor: bg, opacity: 0.7 },
            ]}
          >
            <Text style={[styles.numbers, style]}>{label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          disabled={!text}
          onPress={handleSum}
          activeOpacity={0.8}
          style={[styles.button, styles.equalButton]}
        >
          <MaterialCommunityIcons size={40} name="equal" color={palette.text} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const useStyles = makeUseStyles(({ palette, layout }) => ({
  container: {
    flex: 1,
    paddingVertical: layouts.gutter * 2,
    paddingHorizontal: layouts.gutter * 2,
  },
  title: {
    letterSpacing: 1,
    color: palette.text,
    fontSize: fonts.size.xxlg,
    fontFamily: fonts.variants.regular,
  },
  calculatorOutput: {
    minHeight: 150,
    maxHeight: 200,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: layouts.gutter,
    marginTop: layouts.gutter * 2,
    borderRadius: layouts.gutter / 2,
    paddingVertical: layouts.gutter * 1.5,
    paddingHorizontal: layouts.gutter * 1.2,
    backgroundColor: palette.homeBackground,
  },
  buttonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: layouts.gutter * 3,
  },
  button: {
    borderRadius: 3,
    marginBottom: 2,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.homeBackground,
    width: (layout.screen.width - layouts.gutter * 2) / 4.4,
    height: (layout.screen.width - layouts.gutter * 2) / 4.7,
  },
  numbers: {
    color: palette.text,
    fontSize: fonts.size.xxlg + 2,
    fontFamily: fonts.variants.regular,
  },
  equalButton: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: palette.primary,
  },
  input: {
    width: "100%",
    textAlign: "right",
    color: palette.text,
    fontSize: fonts.size.xlg + 2,
    fontFamily: fonts.variants.regular,
  },
  inputSum: {
    letterSpacing: 1,
    color: palette.text,
    fontWeight: fonts.weight.full,
    fontSize: fonts.size.xxlg * 1.4,
    fontFamily: fonts.variants.regular,
  },
}));

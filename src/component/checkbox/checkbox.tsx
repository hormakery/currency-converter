import React, { useEffect } from "react";
import Animated, {
  withSpring,
  withSequence,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { makeUseStyles } from "../../helpers/makeUseStyles";

interface CheckboxProps {
  isChecked: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ isChecked }) => {
  const scale = useSharedValue(1);
  const { styles, palette } = useStyles();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const startAnimation = () => {
    cancelAnimation(scale);
    scale.value = withSequence(
      withSpring(0.7),
      withSpring(1.05),
      withSpring(0.85),
      withSpring(1)
    );
  };

  useEffect(() => {
    if (isChecked) {
      startAnimation();
    }
  }, [isChecked]);

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
        <FontAwesome
          size={20}
          name="check"
          color={isChecked ? palette.primary : palette.transparent}
        />
      </View>
    </Animated.View>
  );
};

const useStyles = makeUseStyles(({ palette }) => ({
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: palette.hairlineColor,
    backgroundColor: palette.transparent,
  },
  checkedBox: {
    borderColor: palette.primary,
  },
}));

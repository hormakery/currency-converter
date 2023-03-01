const size = {
  xs: 10,
  s: 12,
  default: 14,
  md: 16,
  lg: 20,
  xlg: 24,
  xxlg: 30,
};

interface FontWeightType {
  full: "900";
  semi: "600";
  bold: "bold";
  normal: "normal";
  thin: "400";
}

const weight: FontWeightType = {
  full: "900",
  semi: "600",
  bold: "bold",
  normal: "normal",
  thin: "400",
};

const variants = {
  bold: "RobotoCondensed_700Bold",
  light: "RobotoCondensed_300Light",
  regular: "RobotoCondensed_400Regular",
};

export default {
  size,
  weight,
  variants,
};

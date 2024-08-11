import { StyleSheet } from "react-native";

export const GlobalStyles = {
  colors: {
    primary: "rgb(7, 7, 15)",
    primary50: "rgb(2, 2, 5)",
    primary90: "rgb(9, 10, 17)",
    primary100: "rgb(16, 18, 26)",
    primary300: "rgb(22, 23, 32)",
    primary350: "rgb(26, 27, 38)",
    primary700: "rgb(52, 57, 63)",
    primary800: "rgb(69, 75, 84)",
    primary900: "rgb(107, 116, 130)",
    blue: "rgb(30, 144, 255)",
    cyan: "rgb(76, 201, 240)",
    purple: "rgb(150, 111, 214)",
    orange: "rgb(253, 172, 29)",
    green: "rgb(127, 255, 98)",
    red: "rgb(239, 62, 85)",
    pink: "rgb(247, 37, 133)",
    persianRed: "rgb(196, 69, 54)",
    darkGreen: "rgb(41, 126, 43)",
  },
  styles: StyleSheet.create({
    flexContainer: {
      flex: 1,
      backgroundColor: "#07070F",
    },
    title: {
      color: "white",
      fontWeight: "bold",
    },
    horizontalMargin: {
      marginHorizontal: 20,
    },
  }),
};

import React, { useRef } from "react";
import { Animated, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Colors";

export default function ArrowButton({ isOpen, color }) {
  const animationValue = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const arrowTransform = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  Animated.timing(animationValue, {
    toValue: isOpen ? 1 : 0,
    duration: 300,
    useNativeDriver: true,
  }).start();

  return (
    <View>
      <Animated.View
        style={[
          {
            transform: [{ rotateZ: arrowTransform }],
          },
        ]}
      >
        <Ionicons
          name="caret-down"
          size={20}
          color={color ? color : GlobalStyles.colors.blue}
        />
      </Animated.View>
    </View>
  );
}

import { StyleSheet, Pressable, View } from "react-native";
import { GlobalStyles } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

function ReloadButton({ style, onPress, size, color }) {
  const rotation = useSharedValue(0);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { rotate: withSpring((rotation ? rotation.value : 0) + "deg") },
    ],
  }));
  return (
    <AnimatedPressable
      style={[style, animatedStyles]}
      onPress={() => {
        if (rotation) {
          rotation.value += 360;
        }
        onPress();
      }}
    >
      <View>
        <Ionicons
          name="reload-circle"
          size={size ? size : 25}
          color={color ? color : GlobalStyles.colors.primary900}
        />
      </View>
    </AnimatedPressable>
  );
}

export default ReloadButton;

const styles = StyleSheet.create({});

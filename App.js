import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TimePicker from "./componenets/TimePicker";
import { GlobalStyles } from "./constants/Colors";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState({
    hours: "12",
    minutes: "00",
    amPm: "AM",
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <TimePicker
            title={"Time"}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            time={time}
            setTime={setTime}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

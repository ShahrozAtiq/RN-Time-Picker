import React, { useCallback, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  interpolate,
  LinearTransition,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { GlobalStyles } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

import ArrowButton from "./ArrowButton";
import ReloadButton from "./ReloadButton";
import { debounce, throttle } from "lodash";

const HEIGHT = 150;
const ITEM_SIZE = HEIGHT * 0.3;
const ITEM_SPACING = (HEIGHT - ITEM_SIZE) / 2;

function ScrollList({ data, value, setValue }) {
  const ScrollY = useSharedValue(0);
  const listRef = useRef(null);
  useEffect(() => {
    const index = data.indexOf(value);
    if (index !== -1) {
      listRef.current?.scrollTo({
        y: index * ITEM_SIZE,
        animated: false,
      });
    }
  }, []);
  const debouncedSetValue = useCallback(
    debounce((index) => {
      setValue(index);
    }, 100),
    [setValue]
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      ScrollY.value = event.contentOffset.y;
      const index = Math.round(event.contentOffset.y / ITEM_SIZE);
      runOnJS(debouncedSetValue)(index);
    },
  });

  return (
    <Animated.ScrollView
      ref={listRef}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_SIZE}
      onScroll={onScroll}
      decelerationRate={"fast"}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingVertical: ITEM_SPACING }}
    >
      {data.map((item, index) => {
        const animatedStyles = useAnimatedStyle(() => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
            (index + 2) * ITEM_SIZE,
          ];
          const opacity = interpolate(
            ScrollY.value,
            inputRange,
            [0.2, 0.4, 1, 0.4, 0.2],
            Extrapolate.CLAMP
          );
          const scale = interpolate(
            ScrollY.value,
            inputRange,
            [0.5, 0.6, 1, 0.6, 0.5],
            Extrapolate.CLAMP
          );
          const translateY = interpolate(
            ScrollY.value,
            inputRange,
            [-ITEM_SIZE, -ITEM_SIZE * 0.3, 1, ITEM_SIZE * 0.3, ITEM_SIZE],
            Extrapolate.CLAMP
          );
          return {
            opacity,
            transform: [{ scale }, { translateY }],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              {
                height: ITEM_SIZE,
                alignItems: "center",
                justifyContent: "center",
              },
              animatedStyles,
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: ITEM_SIZE,
                lineHeight: ITEM_SIZE,
                textAlignVertical: "center",
                textAlign: "center",
              }}
            >
              {item.toString()}
            </Text>
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
}

function TimePicker({
  time,
  setTime,
  showPicker,
  setShowPicker,
  title,
  reloadBtn,
  reloadPress,
  darkMode,
}) {
  const hoursData = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutesData = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const amPmData = ["AM", "PM"];
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={[
            GlobalStyles.styles.title,
            {
              marginBottom: 5,
              fontSize: 20,
            },
          ]}
        >
          {title}
        </Text>
        {reloadBtn && <ReloadButton onPress={reloadPress} />}
      </View>
      <Animated.View
        layout={LinearTransition}
        style={[
          {
            backgroundColor: darkMode
              ? GlobalStyles.colors.primary
              : GlobalStyles.colors.primary300,
            padding: 10,
            paddingVertical: 15,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: GlobalStyles.colors.primary900,
            overflow: "hidden",
            zIndex: 1,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            setShowPicker(!showPicker);
          }}
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ color: GlobalStyles.colors.primary900, fontSize: 18 }}>
            {time.hours + ":" + time.minutes}
          </Text>
          <Text
            style={{
              alignSelf: "flex-end",
              color: GlobalStyles.colors.primary900,
              fontSize: 12,
            }}
          >
            {" " + time.amPm}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <ArrowButton isOpen={showPicker} />
          </View>
        </Pressable>
        {showPicker && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{ height: HEIGHT, flexDirection: "row" }}
          >
            <ScrollList
              data={hoursData}
              value={time.hours}
              setValue={(index) => {
                setTime((prevData) => ({
                  ...prevData,
                  hours: hoursData[index],
                }));
              }}
            />
            <LinearGradient
              colors={["transparent", GlobalStyles.colors.blue, "transparent"]}
              style={{
                width: StyleSheet.hairlineWidth,
              }}
            />
            <ScrollList
              data={minutesData}
              value={time.minutes}
              setValue={(index) => {
                setTime((prevData) => ({
                  ...prevData,
                  minutes: minutesData[index],
                }));
              }}
            />
            <LinearGradient
              colors={["transparent", GlobalStyles.colors.blue, "transparent"]}
              style={{
                width: StyleSheet.hairlineWidth,
              }}
            />
            <ScrollList
              data={amPmData}
              value={time.amPm}
              setValue={(index) => {
                setTime((prevData) => ({
                  ...prevData,
                  amPm: amPmData[index],
                }));
              }}
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 210,
    flexDirection: "column",
  },
  selectedItemContainer: {
    height: 50,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedItemText: {
    color: "black",
    fontWeight: "bold",
  },
  itemContainer: {},
  itemText: {},
});

export default TimePicker;

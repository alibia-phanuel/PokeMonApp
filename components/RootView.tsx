import { Colors } from "@/constants/Colors";
import { ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
type Props = ViewProps & {
  backgroundColor?: string;
};
export function RootView({ style, backgroundColor, ...rest }: Props) {
  const progrsss = useSharedValue(0);
  const animatrdStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progrsss.value,
        [0, 1],
        [Colors.light.tint, backgroundColor ?? Colors.light.tint]
      ),
    };
  }, [backgroundColor]);

  useEffect(() => {
    progrsss.value = 0;
    if (backgroundColor) {
      progrsss.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [backgroundColor]);

  if (!backgroundColor) {
    return (
      <SafeAreaView
        style={[rootStyle, { backgroundColor: Colors.light.tint }, style]}
        {...rest}
      />
    );
  }
  return (
    <Animated.View style={[{ flex: 1 }, animatrdStyle, style]}>
      <SafeAreaView style={rootStyle} {...rest}></SafeAreaView>
    </Animated.View>
  );
}

const rootStyle = {
  flex: 1,
  padding: 4,
} satisfies ViewStyle;

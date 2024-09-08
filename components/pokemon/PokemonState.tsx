import { StyleSheet, View, type ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
type Props = ViewProps & {
  name: string;
  value: number;
  color: string;
};
function statShortName(name: string): string {
  const newName = name
    .replaceAll("special", "S")
    .replaceAll("-", "")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
  return newName;
}
export function PokemonStat({ style, color, name, value, ...rest }: Props) {
  const sharedValue = useSharedValue(value);
  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value,
    };
  });

  const barBackgroundStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value,
    };
  });
  useEffect(() => {
    sharedValue.value = withSpring(value);
  }, [value]);

  return (
    <View>
      <Row style={[style]} {...rest} gap={8}>
        <View style={styles.name}>
          <ThemedText variant="subtitle2" style={{ color: color }}>
            {statShortName(name)}
          </ThemedText>
        </View>
        <View style={styles.number}>
          <ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
        </View>
        <Row style={styles.bar}>
          <Animated.View
            style={[
              styles.barInner,
              { flex: value, backgroundColor: color },
              barInnerStyle,
            ]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.BarBarbackground,
              barBackgroundStyle,
              { backgroundColor: color },
            ]}
          ></Animated.View>
        </Row>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    width: 45,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.light.grayLight,
  },
  number: {
    width: 23,
  },
  bar: {
    flex: 1,
    borderRadius: 20,
    height: 4,
    overflow: "hidden",
  },
  barInner: {
    height: 4,
  },
  BarBarbackground: {
    height: 4,
    opacity: 0.24,
  },
});

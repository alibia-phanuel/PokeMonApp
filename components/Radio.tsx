import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";

type Props = {
  checked: boolean;
};
export function Radio({ checked }: Props) {
  return (
    <View style={styles.Radio}>
      {checked && <View style={styles.RadioInner}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  Radio: {
    color: Colors.light.tint,
    width: 14,
    height: 14,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  RadioInner: {
    backgroundColor: Colors.light.tint,
    borderRadius: 6,
    width: 6,
    height: 6,
  },
});

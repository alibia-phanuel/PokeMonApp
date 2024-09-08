import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Card } from "./Card";
import { Radio } from "./Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
  value: "id" | "name";
  onChange: (v: "id" | "name") => void;
};
const buttonRef = useRef<View>(null);
const option = [
  { label: "Number", value: "id" },
  { label: "Name", value: "name" },
] as const;
export function SortButton({ value, onChange }: Props) {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [position, setPositon] = useState<null | {
    top: number;
    right: number;
  }>(null);
  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPositon({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
    });
    setModalVisibility(true);
  };
  const onClose = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View ref={buttonRef} style={style.button}>
          <Image
            source={
              value === "id"
                ? require("@/assets/images/Icones/number.png")
                : require("@/assets/images/Icones/text.png")
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={onClose}
      >
        <Pressable style={style.backdrop} />
        <View style={[style.popup, { ...position }]}>
          <ThemedText style={style.title} variant="subtitle2" color="grayWhite">
            Sort by :
          </ThemedText>
          <Card style={style.card}>
            {option.map((o) => (
              <Pressable key={o.value} onPress={() => onChange(o.value)}>
                <View style={style.checkContainer}>
                  <Radio checked={o.value === value} />
                  <ThemedText>{o.label}</ThemedText>
                </View>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}
const style = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  popup: {
    position: "absolute",
    width: 113,
    padding: 4,
    borderRadius: 12,
    ...Shadows.db2,
    paddingTop: 16,
    gap: 16,
    backgroundColor: Colors.light.tint,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  checkContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

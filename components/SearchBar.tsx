import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "@/components/Row";

type Props = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <Row gap={8} style={styles.wrapper}>
      <Image source={require("@/assets/images/Icones/search.png")} />
      <TextInput style={styles.input} onChangeText={onChange} value={value} />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    height: 36,
    fontSize: 10,
    lineHeight: 16,
  },
});

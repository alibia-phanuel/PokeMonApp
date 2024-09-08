import {
  Image,
  View,
  StyleSheet,
  type ViewStyle,
  Pressable,
} from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};
export function PokemonCard({ name, id, style }: Props) {
  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable style={style}>
        <Card style={[styles.card]}>
          <View
            style={[
              styles.shadow,
              { backgroundColor: Colors.light.grayBackground },
            ]}
          />

          <ThemedText variant="caption" color="grayMedium">
            #{id.toString().padStart(3, "0")}
          </ThemedText>
          <Image
            style={styles.img}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }}
          />

          <ThemedText>{name}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },
  img: {
    width: 72,
    height: 72,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
  },
});

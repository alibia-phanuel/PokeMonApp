import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { View, type ViewStyle } from "react-native";

type Props = {
  name: keyof (typeof Colors)["type"];
};

export function PokemonType({ name }: Props) {
  return (
    <View style={rooStyle}>
      {/***justifi le tire */}
      <ThemedText
        color="grayWhite"
        variant="subtitle2"
        style={{
          textTransform: "capitalize",
          backgroundColor: "#3C3D37",
          height: 20,
          paddingHorizontal: 8,
          borderRadius: 8,
        }}
      >
        {name}
      </ThemedText>
      {/***justifi le tire */}
    </View>
  );
}
const rooStyle = {
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
} satisfies ViewStyle;

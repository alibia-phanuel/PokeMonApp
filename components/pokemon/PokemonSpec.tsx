import {
  type ImageSourcePropType,
  StyleSheet,
  Image,
  View,
  type ViewProps,
} from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
};

export function PokemonSpec({
  style,
  image,
  title,
  description,
  ...rest
}: Props) {
  return (
    <View style={[style, styles.root]} {...rest}>
      <Row gap={3} style={{ width: 100, flex: 1, justifyContent: "center" }}>
        {image && <Image source={image} height={16} width={16} />}
        <ThemedText>{title}</ThemedText>
      </Row>
      <ThemedText>{description}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: "center",
    width: 80,
  },
  row: {
    height: 32,
    alignItems: "center",
  },
});

import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { View, ViewStyle, type ViewProps } from "react-native";
type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[style, styles, { backgroundColor: colors.grayWhite }]}
      {...rest}
    />
  );
}

const styles = {
  borderRadius: 8,
  overflow: "hidden",
  ...Shadows.db2,
} satisfies ViewStyle;

//Renvoir les couleurs qui corresponde au theme qui on ete choisi par l'utilisateur

import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function useThemeColors() {
  const theme = useColorScheme() ?? "light";
  return Colors[theme];
}

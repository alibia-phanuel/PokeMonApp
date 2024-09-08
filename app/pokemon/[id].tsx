import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { getPokemonArtwork } from "@/functions/pokemon";
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/constants/Colors";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { Row } from "@/components/Row";
import { formatSize, formatWeight } from "@/functions/pokemon";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonState";
import { Audio } from "expo-av";
export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: params.id,
  });
  const id = parseInt(params.id, 10);
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replaceAll("\n", ".");
  const onImagePress = async () => {
    const cry = pokemon?.cries.latest;
    if (!cry) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: cry,
      },
      { shouldPlay: true }
    );
    sound.playAsync();
  };
  const onPrevious = () => {
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.max(id - 1, 1) },
    });
  };
  const onNext = () => {
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.min(id + 1, 151) },
    });
  };
  return (
    <RootView
      backgroundColor={colorType}
      style={{ backgroundColor: colorType }}
    >
      <View>
        <Image
          style={styles.pokeball}
          source={require("@/assets/images/Icones/Pokeball.png")}
          width={208}
          height={208}
        />
        <View style={styles.header}>
          <Pressable onPress={router.back}>
            <View style={styles.pokemonHeader}>
              <Image
                source={require("@/assets/images/Icones/back.png")}
                width={32}
                height={32}
              />
              <ThemedText color="grayWhite" variant="headline">
                {pokemon?.name}
              </ThemedText>
            </View>
          </Pressable>
          <ThemedText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, "0")}
          </ThemedText>
        </View>

        <View style={styles.body}>
          <Row style={styles.imageRow}>
            {id === 1 ? (
              <View style={{ width: 24, height: 24 }}></View>
            ) : (
              <Pressable onPress={onPrevious}>
                <Image
                  source={require("@/assets/images/Icones/left.png")}
                  width={24}
                  height={24}
                />
              </Pressable>
            )}

            <Pressable onPress={onImagePress}>
              <Image
                style={styles.img}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${params.id}.png`,
                }}
              />
            </Pressable>

            {id === 151 ? (
              <View style={{ width: 24, height: 24 }}></View>
            ) : (
              <Pressable onPress={onNext}>
                <Image
                  source={require("@/assets/images/Icones/right.png")}
                  width={24}
                  height={24}
                />
              </Pressable>
            )}
          </Row>

          {/***justifi le tire */}
          <Card style={styles.card}>
            <Row gap={16}>
              {types.map((type) => (
                <PokemonType name={type.type.name} key={type.type.name} />
              ))}
            </Row>
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              About
            </ThemedText>
            <Row gap={16}>
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderRightWidth: 1,
                  borderColor: colors.grayLight,
                }}
                title={formatWeight(pokemon?.weigth)}
                description="Weight"
                image={require("@/assets/images/Icones/store.png")}
              />
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderRightWidth: 1,
                  borderColor: colors.grayLight,
                }}
                title={formatSize(pokemon?.heigth)}
                description="Size"
                image={require("@/assets/images/Icones/regle.png")}
              />
              <PokemonSpec
                title={pokemon?.moves
                  .slice(0, 2)
                  .map((m) => m.move.name)
                  .join("\n")}
                description="Moves"
              />
            </Row>
            <ThemedText>{bio}</ThemedText>
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              Base stats
            </ThemedText>
            <View style={{ alignSelf: "stretch" }}>
              {pokemon?.stats.map((stat) => (
                <PokemonStat
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </Card>
          {/***justifi le tire End */}
        </View>
      </View>
      <Text>Pokemon {params.id}</Text>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  pokemonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pokeball: {
    opacity: 0.1,
    position: "absolute",
    right: 8,
    top: 8,
  },
  imageRow: {
    position: "absolute",
    justifyContent: "space-between",
    left: 0,
    right: 0,
    top: -140,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 85,
    alignItems: "center",
    gap: 46,
    paddingBottom: 20,
  },
});

import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/pokemon/pokemonCard";
import { getPokemonId } from "@/functions/pokemon";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { SortButton } from "@/components/SortButton";
import { RootView } from "@/components/RootView";

export default function Index() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("/pokemon?limit=21");

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");

  const pokemons =
    data?.pages
      .flatMap((page) => page.results)
      .map((r) => ({ name: r.name, id: getPokemonId(r.url) })) ?? [];
  //creation de fonctiion de filtre a base du tableax des pokemon
  const filterdPokemon = [
    ...(search
      ? pokemons.filter(
          (p) =>
            p.name.includes(search.toLocaleLowerCase()) ||
            p.id.toString() === search
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
  return (
    <RootView>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/Logo/Pokeball.png")}
          width={24}
          height={24}
        />
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </View>
      {/**Composant search bar */}
      <View style={styles.Search}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </View>
      {/**Composant search bar */}
      <Card style={styles.body}>
        <FlatList
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={[styles.gridGap, styles.list]}
          numColumns={3}
          data={filterdPokemon}
          onEndReached={search ? undefined : () => fetchNextPage()}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body: {
    flex: 1,
    margin: 4,
    marginTop: 16,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
  Search: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 16,
  },
  form: {
    paddingHorizontal: 12,
  },
});

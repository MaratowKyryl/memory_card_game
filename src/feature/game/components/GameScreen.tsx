import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { BainsleyBoldText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import AnimatedCard from "@/src/feature/game/components/AnimatedCard";
import { cards } from "@/src/feature/game/constants/data";
import { iCard } from "@/src/feature/game/utils/types";
import Lang from "@/src/lang";

export default function GameScreen() {
  const router = useRouter();
  const [shuffledCards, setShuffledCards] = useState<(iCard | undefined)[]>([]);
  const [arrayCards, setArrayCards] = useState<(iCard | undefined)[]>([]);
  const { difficultyId } = useLocalSearchParams();
  const numColumns = useRef(difficultyId === "easy" ? 2 : difficultyId === "medium" ? 3 : 4);

  useEffect(() => {
    const arrayLength = difficultyId === "easy" ? 8 : difficultyId === "medium" ? 12 : 16;
    const shuffledArrayCards = Array.from({ length: arrayLength }, (_, i) => undefined);
    const arrayCards = cards.slice(0, arrayLength);

    // const shuffledArray = arrayCards.sort(() => Math.random() - 0.5);
    setArrayCards(arrayCards);
    setShuffledCards(shuffledArrayCards);
  }, []);

  const onCardOpened = (index: number, card: iCard | undefined) => {
    if (!card) {
      const randomIndex = Math.floor(Math.random() * arrayCards.length);
      const newShuffledArray = [...shuffledCards];
      newShuffledArray[index] = arrayCards[randomIndex];
      setShuffledCards(newShuffledArray);
      const newCardArray = arrayCards.filter((_, i) => i !== randomIndex);
      setArrayCards(newCardArray);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={() => router.navigate(`/`)} style={styles.restartGameButton}>
        <FontAwesome name="repeat" size={24} color="black" />
      </TouchableOpacity>
      <BainsleyBoldText style={styles.restartGameTitle}>{Lang.NEW_GAME}</BainsleyBoldText>
      <FlatList
        data={shuffledCards}
        renderItem={({ item, index }) => (
          <AnimatedCard key={index} index={index} item={item} onCardOpened={onCardOpened} />
        )}
        numColumns={numColumns.current}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  restartGameButton: {
    height: 50,
    width: 50,
    backgroundColor: Colors.newGameButton,
    borderWidth: 2,
    borderColor: Colors.borderBlack,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  restartGameTitle: {
    fontSize: 19,
  },
});

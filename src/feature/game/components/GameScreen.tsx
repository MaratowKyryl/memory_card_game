import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { BainsleyBoldText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import { AnimatedCard } from "@/src/feature/game/components/AnimatedCard";
import { cards } from "@/src/feature/game/constants/data";
import { iCard } from "@/src/feature/game/utils/types";
import Lang from "@/src/lang";

export default function GameScreen() {
  const router = useRouter();
  const { difficultyId } = useLocalSearchParams();
  const numColumns = useRef(difficultyId === "easy" ? 2 : difficultyId === "medium" ? 3 : 4);
  const cardSize = { current: 100 };
  const imageSize = { current: 80 };
  const [shuffledCards, setShuffledCards] = useState<iCard[]>([]);

  useEffect(() => {
    const arrayLength = difficultyId === "easy" ? 8 : difficultyId === "medium" ? 12 : 16;
    const arrayCards = cards.slice(0, arrayLength);
    const shuffledArrayCards = arrayCards.sort(() => Math.random() - 0.5);
    setShuffledCards(shuffledArrayCards);
  }, []);

  const onCardOpened = (index: number, card: iCard) => {
    const newShuffledCards = [...shuffledCards];
    const flippedCards = newShuffledCards.filter((card) => card?.isFlipped);
    if (flippedCards.length === 2) {
      newShuffledCards.forEach((card) => {
        card.isFlipped = false;
      });
    }
    newShuffledCards[index] = card;
    setShuffledCards(newShuffledCards);
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
          <AnimatedCard
            key={index}
            index={index}
            item={item}
            cardSize={cardSize.current}
            imageSize={imageSize.current}
            onCardOpened={onCardOpened}
            // isOpened={openedCards.includes(index)}
            // isGuessed={guessedCards.includes(index)}
          />
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

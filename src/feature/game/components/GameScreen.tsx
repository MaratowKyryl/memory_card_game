import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { BainsleyBoldText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import { AnimatedCard } from "@/src/feature/game/components/AnimatedCard";
import { useCards } from "@/src/feature/game/utils/hooks";
import Lang from "@/src/lang";

export default function GameScreen() {
  const router = useRouter();
  const { difficultyId } = useLocalSearchParams();
  const numColumns = useRef(difficultyId === "easy" ? 2 : difficultyId === "medium" ? 3 : 4);
  const cardSize = useRef<number>(difficultyId === "hard" ? 70 : 100);
  const imageSize = useRef<number>(difficultyId === "hard" ? 50 : 70);
  const { shuffledCards, onCardOpened, openedCards, guessedCards } = useCards(
    difficultyId as string,
  );

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
            isOpened={openedCards.includes(index)}
            isGuessed={guessedCards.includes(index)}
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

import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { cards } from "@/src/feature/game/constants/data";
import { iCard } from "@/src/feature/game/utils/types";

export function useFlipAnimation() {
  const spin = useSharedValue<number>(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return { frontAnimatedStyle, backAnimatedStyle, spin };
}

export function useCards(difficultyId: string) {
  const [shuffledCards, setShuffledCards] = useState<(iCard | undefined)[]>([]);
  const [arrayCards, setArrayCards] = useState<iCard[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [guessedCards, setGuessedCards] = useState<number[]>([]);

  useEffect(() => {
    const arrayLength = difficultyId === "easy" ? 8 : difficultyId === "medium" ? 12 : 16;
    // First, we create an array of undefined values with the length of the array.
    const shuffledArrayCards = Array.from({ length: arrayLength }, (_, i) => undefined);
    const arrayCards = cards.slice(0, arrayLength);

    setArrayCards(arrayCards);
    setShuffledCards(shuffledArrayCards);
  }, []);

  useEffect(() => {
    const arrayLength = difficultyId === "easy" ? 8 : difficultyId === "medium" ? 12 : 16;
    if (guessedCards.length === arrayLength) {
      Alert.alert("Congratulations!", "You made it, King!");
    }
  }, [guessedCards]);

  const onCardOpened = (index: number, card: iCard | undefined) => {
    let localCard = card;
    if (openedCards.length === 2) {
      return;
    }

    if (!card) {
      // If the card is undefined, we need to set random element at opened index.
      const randomIndex = Math.floor(Math.random() * arrayCards.length);
      const randomCard = arrayCards[randomIndex];
      const newShuffledArray = [...shuffledCards];
      newShuffledArray[index] = randomCard;
      setShuffledCards(newShuffledArray);
      const newCardArray = arrayCards.filter((_, i) => i !== randomIndex);
      setArrayCards(newCardArray);
      localCard = randomCard;
    }

    const newOpenedCards = [...openedCards, index];
    setOpenedCards(newOpenedCards);

    const isPair =
      newOpenedCards.length === 2 && shuffledCards[newOpenedCards[0]]?.pairId === localCard?.pairId;

    if (isPair) {
      setGuessedCards([...guessedCards, newOpenedCards[0], index]);
      setOpenedCards([]);
    } else if (newOpenedCards.length === 2) {
      setTimeout(() => {
        setOpenedCards([]);
      }, 2000);
    }
  };

  return { shuffledCards, onCardOpened, openedCards, guessedCards };
}

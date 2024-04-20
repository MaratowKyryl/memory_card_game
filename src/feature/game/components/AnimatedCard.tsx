import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Animated from "react-native-reanimated";

import Colors from "@/src/common/constants/Colors";
import { images } from "@/src/feature/game/constants/data";
import { useFlipAnimation } from "@/src/feature/game/utils/hooks";
import { iCard } from "@/src/feature/game/utils/types";

export function AnimatedCard({
  item,
  onCardOpened,
  index,
  isOpened,
  isGuessed,
  cardSize,
  imageSize,
}: {
  item: iCard | undefined;
  onCardOpened: (index: number, cardId: iCard | undefined) => void;
  index: number;
  isOpened: boolean;
  isGuessed: boolean;
  cardSize: number;
  imageSize: number;
}) {
  const { frontAnimatedStyle, backAnimatedStyle, spin } = useFlipAnimation();

  useEffect(() => {
    if (isOpened || isGuessed) {
      spin.value = 1;
    } else {
      spin.value = 0;
    }
  }, [isOpened, isGuessed]);

  const onOpened = () => {
    if (isOpened) {
      return;
    }
    onCardOpened(index, item);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onOpened}>
        <Animated.View
          style={[styles.cardFront, frontAnimatedStyle, { width: cardSize, height: cardSize }]}
        >
          <FontAwesome name="question" size={24} color={Colors.borderBlack} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpened}>
        <Animated.View
          style={[styles.cardBack, backAnimatedStyle, { width: cardSize, height: cardSize }]}
        >
          {item ? (
            <Image source={images[item.imageId]} style={{ width: imageSize, height: imageSize }} />
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
  },
  cardFront: {
    width: 100,
    height: 100,
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderBlack,
    borderRadius: 10,
  },
  cardBack: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderBlack,
    borderRadius: 10,
  },
});

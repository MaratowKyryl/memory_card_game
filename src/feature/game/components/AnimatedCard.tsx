import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { isNumber } from "util";

import { BainsleyBoldText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import { useFlipAnimation } from "@/src/feature/game/utils/hooks";
import { iCard } from "@/src/feature/game/utils/types";

export default function AnimatedCard({
  item,
  onCardOpened,
  index,
}: {
  item: iCard | undefined;
  onCardOpened: (index: number, cardId: iCard | undefined) => void;
  index: number;
}) {
  const { frontAnimatedStyle, backAnimatedStyle, spin } = useFlipAnimation();

  const onOpened = () => {
    onCardOpened(index, item);
    spin.value = spin.value ? 0 : 1;
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => (spin.value = spin.value ? 0 : 1)}>
        <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
          <FontAwesome name="question" size={24} color={Colors.borderBlack} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpened}>
        <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
          {item || isNumber(item) ? <BainsleyBoldText>{item.pairId}</BainsleyBoldText> : null}
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
    backgroundColor: Colors.newGameButton,
    backfaceVisibility: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderBlack,
    borderRadius: 10,
  },
});

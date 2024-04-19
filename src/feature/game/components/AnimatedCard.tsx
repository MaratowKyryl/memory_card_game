import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { BainsleyBoldText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";

export default function AnimatedCard() {
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
  return (
    <View>
      <TouchableOpacity onPress={() => (spin.value = spin.value ? 0 : 1)}>
        <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
          <FontAwesome name="question" size={24} color={Colors.borderBlack} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => (spin.value = spin.value ? 0 : 1)}>
        <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
          <BainsleyBoldText>BACK</BainsleyBoldText>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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

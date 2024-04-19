import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { BainsleyBoldText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import AnimatedCard from "@/src/feature/game/components/AnimatedCard";
import Lang from "@/src/lang";

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={() => router.navigate(`/`)} style={styles.restartGameButton}>
        <FontAwesome name="repeat" size={24} color="black" />
      </TouchableOpacity>
      <BainsleyBoldText style={styles.restartGameTitle}>{Lang.NEW_GAME}</BainsleyBoldText>
      <AnimatedCard />
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

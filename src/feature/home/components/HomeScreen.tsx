import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { BainsleyBoldText, BainsleyText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import Lang from "@/src/lang";

export default function HomeScreen() {
  return (
    <View style={styles.contentContainer}>
      <BainsleyText style={styles.selectDifficultyTitle}>{Lang.SELECT_DIFFICULTY}</BainsleyText>
      <SelectDifficultyButton navigateTo="/game/easy" text={Lang.EASY} />
      <SelectDifficultyButton navigateTo="/game/medium" text={Lang.MEDIUM} />
      <SelectDifficultyButton navigateTo="/game/hard" text={Lang.HARD} />
    </View>
  );
}

function SelectDifficultyButton({ navigateTo, text }: { navigateTo: string; text: string }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.selectDifficultyButton}
      onPress={() => router.navigate(navigateTo)}
    >
      <BainsleyBoldText style={styles.selectDifficultyButtonTitle}>{text}</BainsleyBoldText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectDifficultyTitle: {
    fontSize: 30,
  },
  selectDifficultyButton: {
    width: 200,
    marginTop: 20,
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  selectDifficultyButtonTitle: {
    fontSize: 40,
  },
});

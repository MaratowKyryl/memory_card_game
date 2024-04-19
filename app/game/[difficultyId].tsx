import { HeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";

import Styles from "@/src/common/constants/Styles";
import GameScreen from "@/src/feature/game/components/GameScreen";

export default function GameStack() {
  return (
    <>
      <Stack.Screen
        options={{ header: () => <HeaderTitle />, contentStyle: Styles.appBackground }}
      />
      <GameScreen />
    </>
  );
}

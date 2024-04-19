import { SafeAreaView } from "react-native";

import { BainsleyText } from "@/src/common/components/StyledText";
import Colors from "@/src/common/constants/Colors";
import Lang from "@/src/lang";

export function HeaderTitle() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.appBackground,
        justifyContent: "center",
        alignItems: "center",
        height: 150,
      }}
    >
      <BainsleyText style={{ fontSize: 30 }}>{Lang.APP_TITLE}</BainsleyText>
    </SafeAreaView>
  );
}

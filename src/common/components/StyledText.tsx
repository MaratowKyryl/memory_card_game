import { Text, TextProps } from "react-native";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function BainsleyText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Bainsley" }]} />;
}

export function BainsleyBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Bainsley-Bold" }]} />;
}

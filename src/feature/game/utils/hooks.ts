import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

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

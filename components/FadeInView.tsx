import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FadeInViewProps {
  direction?: 'left' | 'right' | 'none';
  style?: ViewStyle | ViewStyle[];
}

// Reliable mount-in fade/slide. See Card.tsx for why this avoids
// Reanimated's entering/exiting props (they can freeze mid-animation).
export function FadeInView({ direction = 'none', style, children }: PropsWithChildren<FadeInViewProps>) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(progress, { toValue: 1, duration: 260, useNativeDriver: true });
    anim.start();
    const settle = setTimeout(() => progress.setValue(1), 340);
    return () => {
      anim.stop();
      clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offset = direction === 'left' ? -20 : direction === 'right' ? 20 : 0;

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] }) },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

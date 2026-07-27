import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Simple, reliable mount-in animation for step-by-step wizards. Deliberately
// avoids Reanimated's entering/exiting props, which can freeze mid-animation
// (see Card.tsx for the same fix and why).
export function StepTransition({ children }: PropsWithChildren<{}>) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    });
    anim.start();
    const settle = setTimeout(() => progress.setValue(1), 300);
    return () => {
      anim.stop();
      clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={{
        opacity: progress,
        transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}

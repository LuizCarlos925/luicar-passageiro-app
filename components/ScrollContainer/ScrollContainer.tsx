import { PropsWithChildren, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { colors } from '@/global/theme';

interface Props {
  contentContainerStyle?: ViewStyle;
}

const ScrollContainer = ({
  children,
  contentContainerStyle,
}: PropsWithChildren<Props>) => {
  const [trackHeight, setTrackHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const scrollY = useSharedValue(0);

  const indicatorHeight = Math.max(
    20,
    (viewportHeight / Math.max(contentHeight, viewportHeight)) * trackHeight,
  );

  const availableScrollSpace = trackHeight - indicatorHeight;

  const maxScrollDistance = Math.max(0, contentHeight - viewportHeight);

  const scrollBarStyle = useAnimatedStyle(() => {
    const translateY =
      maxScrollDistance > 0
        ? (scrollY.value / maxScrollDistance) * availableScrollSpace
        : 0;

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          setContentHeight(height);
        }}
        onLayout={event => {
          setViewportHeight(event.nativeEvent.layout.height);
        }}
        onScroll={event => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        style={{ flex: 1 }}
      >
        {children}
      </ScrollView>
      {contentHeight > viewportHeight && (
        <View
          style={styles.scrollBar}
          onLayout={event => setTrackHeight(event.nativeEvent.layout.height)}
        >
          <Animated.View
            style={[styles.bar, scrollBarStyle, { height: indicatorHeight }]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  scrollBar: {
    height: '100%',
    width: 6,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: colors.primary_100,
  },
});

export default ScrollContainer;

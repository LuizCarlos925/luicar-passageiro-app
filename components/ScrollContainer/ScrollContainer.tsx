import { PropsWithChildren, useState } from 'react';
import { ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import {
  Container,
  ContainerWrapper,
  ScrollBar,
  ScrollViewIndicator,
} from './styles';

interface ScrollContainerProps extends PropsWithChildren {
  contentContainerStyle?: ViewStyle;
}

const scrollIndicatorHeight = 45;

const ScrollContainer = ({
  children,
  contentContainerStyle,
}: ScrollContainerProps) => {
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const scrollBarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value }],
    };
  });

  return (
    <ContainerWrapper>
      <Container
        contentContainerStyle={{ paddingRight: 24, ...contentContainerStyle }}
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          scrollY.value =
            (event.nativeEvent.contentOffset.y *
              (event.nativeEvent.layoutMeasurement.height -
                scrollIndicatorHeight)) /
            (event.nativeEvent.contentSize.height - visibleScrollBarHeight);
        }}
      >
        {children}
      </Container>
      <ScrollBar
        onLayout={event =>
          setVisibleScrollBarHeight(event.nativeEvent.layout.height)
        }
      >
        <ScrollViewIndicator
          style={[scrollBarStyle, { height: scrollIndicatorHeight }]}
        />
      </ScrollBar>
    </ContainerWrapper>
  );
};

export default ScrollContainer;

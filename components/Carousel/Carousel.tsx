import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Linking, ListRenderItem, ViewToken } from 'react-native';
import { Image } from 'expo-image';

import { getImageUrl } from '@/services/api';
import { ImageWrapper } from './styles';

export interface IImages {
  id: number;
  image: string;
  link: string;
}

interface CarouselProps {
  images: IImages[];
}

interface ViewableItemsChangedProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const AUTO_PLAY_INTERVAL = 3000; // Milliseconds

const Carousel = ({ images }: CarouselProps) => {
  const flatListRef = useRef<FlatList>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: ViewableItemsChangedProps) => {
      if (viewableItems?.length > 0) {
        const nextIndex = Math.round(viewableItems[0]?.index || 0);
        setCurrentIndex(nextIndex);
      }
    },
    [],
  );

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
        viewPosition: 0.5,
      });
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, images.length]);

  const renderBanners: ListRenderItem<IImages> = ({ item }) => (
    <ImageWrapper onPress={() => Linking.openURL(item.link)}>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{ uri: getImageUrl(item.image) }}
        contentFit="fill"
      />
    </ImageWrapper>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      keyExtractor={item => String(item.id)}
      renderItem={renderBanners}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 30 }}
      style={{ width: '100%' }}
      contentContainerStyle={{ gap: 10 }}
      horizontal
      pagingEnabled
    />
  );
};

export default memo(Carousel);

import React from 'react';
import { ViewStyle } from 'react-native';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import Text from '@/components/Text/Text';
import { StarFilledIcon, StarIcon } from '@/assets/icons';
import { colors } from '@/global/theme';
import { Container, StarWrapper } from './styles';

type Props<TFieldValues extends FieldValues> = {
  containerStyles?: ViewStyle;
  size: number;
  rating?: number;
  isDisabled?: boolean;
  showLabel?: boolean;
} & UseControllerProps<TFieldValues>;

export const SelectRating = <TFieldValues extends FieldValues>({
  control,
  name,
  containerStyles,
  size,
  rating = 0,
  isDisabled,
  showLabel,
}: Props<TFieldValues>) => {
  const { field } = useController({
    control,
    name,
  });

  const handleRatingPress = (selectedRating: number) => {
    if (field?.value === selectedRating) {
      return field?.onChange(0);
    }
    field?.onChange(selectedRating);
  };

  const renderIcon = (index: number) => {
    const valueSelected = rating || field?.value;

    if (index + 1 <= valueSelected) {
      return <StarFilledIcon width={size} height={size} />;
    }
    return <StarIcon width={size} height={size} color={colors.primary_100} />;
  };

  if (isDisabled) {
    return (
      <Container style={containerStyles}>
        {Array.from({ length: 5 }).map((item, index) => (
          <StarWrapper key={index?.toString()} onPress={() => null}>
            {renderIcon(index)}
          </StarWrapper>
        ))}
        {showLabel && <Text size={size - 6}>{rating?.toFixed(1)}/5</Text>}
      </Container>
    );
  }

  return (
    <Container style={[containerStyles, { height: size + 6 }]}>
      {Array.from({ length: 5 }).map((item, index) => (
        <StarWrapper
          key={index?.toString()}
          onPress={() => handleRatingPress(index + 1)}
        >
          {renderIcon(index)}
        </StarWrapper>
      ))}
      {showLabel && <Text size={size - 6}>{rating?.toFixed(1)}/5</Text>}
    </Container>
  );
};

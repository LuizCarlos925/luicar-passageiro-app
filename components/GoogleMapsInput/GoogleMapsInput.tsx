import React, { useEffect, useImperativeHandle } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ViewStyle,
  Pressable,
} from 'react-native';
import { useController, useWatch } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

import {
  PlaceResult,
  usePlacesAutocomplete,
} from '@/hooks/usePlacesAutocomplete';
import Input, { InputProps } from '../Input/Input';

export interface GoogleMapsInputRef {
  close: () => void;
  open: () => void;
}

interface GoogleMapsInputProps extends InputProps<any> {
  inputContainerStyle?: ViewStyle;
  onPlaceSelect?: (place: PlaceResult) => void;
  inputRef?: React.Ref<GoogleMapsInputRef>;
}

const GoogleMapsInput: React.FC<GoogleMapsInputProps> = ({
  control,
  name,
  onPlaceSelect,
  defaultValue,
  inputContainerStyle,
  inputRef,
  ...props
}) => {
  const { setInput, places, loading, input } = usePlacesAutocomplete({});
  const [lastInput, setLastInput] = React.useState(defaultValue);
  const [isOpened, setIsOpened] = React.useState(false);

  const value = useWatch({ control, name });
  const { field } = useController({ control, name });

  const isDefaultValue = value === defaultValue;

  useEffect(() => {
    if (value && !isDefaultValue) {
      setInput(value);
    }
  }, [value, isDefaultValue]);

  const onSelectPlace = (place: PlaceResult) => {
    field.onChange(place.description);
    setLastInput(place.description);
    setInput('');
    onPlaceSelect?.(place);
  };

  useImperativeHandle(inputRef, () => ({
    close: () => {
      setIsOpened(false);
    },
    open: () => {
      setIsOpened(true);
    },
  }));

  return (
    <View style={inputContainerStyle}>
      <Input
        control={control}
        name={name}
        {...props}
        iconRight={value ? 'CloseIcon' : undefined}
        onPressIconRight={() => {
          field.onChange('');
          setLastInput('');
          setInput('');
        }}
        onFocus={e => {
          setIsOpened(true);
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
      />
      {loading && !isDefaultValue && input?.length > 3 && (
        <ActivityIndicator
          size={30}
          style={{
            marginTop: 16,
          }}
        />
      )}
      {places.length > 0 && input?.length > 3 && isOpened && (
        <ScrollView
          style={{
            maxHeight: 200,
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 4,
            elevation: 3,
          }}
        >
          {places.map(place => (
            <Pressable
              key={place.id}
              onPress={() => {
                onSelectPlace?.(place);
              }}
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>
                {place.structured_formatting?.main_text}
              </Text>
              <Text style={{ color: '#666' }}>
                {place.structured_formatting?.secondary_text}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GoogleMapsInput;

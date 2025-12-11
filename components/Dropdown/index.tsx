/* eslint-disable react-hooks/rules-of-hooks */
import { colors, fonts } from '@/global/theme';
import React, { useState } from 'react';
import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { View, ViewStyle } from 'react-native';
import DropDownPicker, { ListModeType } from 'react-native-dropdown-picker';
import { ErrorMessage } from '../Input/styles';
import Text from '../Text/Text';

interface Option {
  label: string;
  value: string;
}

type Props<TFieldValues extends FieldValues> = {
  options: Option[];
  placeholder?: string;
  zIndex?: number;
  zIndexInverse?: number;
  label?: string;
  listMode?: ListModeType;
  containerStyle?: ViewStyle;
  listItemContainerStyle?: ViewStyle;
  listParentContainerStyle?: ViewStyle;
  dropDownContainerStyle?: ViewStyle;
  style?: ViewStyle;
  searchable?: boolean;
} & UseControllerProps<TFieldValues>;

/**
 *
 * @param zIndex Utilizar zIndex maior que 1 para que o dropdown fique acima de outros dropdown
 */
const Dropdown = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  label,
  listMode = 'FLATLIST',
  placeholder,
  zIndex = 1,
  containerStyle,
  listItemContainerStyle,
  listParentContainerStyle,
  dropDownContainerStyle,
  style,
  zIndexInverse,
  searchable,
}: Props<TFieldValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control: control as Control<TFieldValues>,
    name,
  });

  const [isOpen, setOpen] = useState(false);

  return (
    <View>
      {label && (
        <Text size={16} fontWeight={600} style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <DropDownPicker
        open={isOpen}
        value={value}
        items={options}
        listMode={listMode}
        modalTitle={placeholder}
        modalAnimationType="slide"
        setOpen={setOpen}
        setValue={() => null}
        setItems={() => null}
        flatListProps={{
          nestedScrollEnabled: true,
        }}
        onSelectItem={item => onChange(item.value)}
        containerStyle={{
          width: '100%',
          alignSelf: 'center',
          zIndex,
          ...containerStyle,
        }}
        listItemContainerStyle={{
          borderTopWidth: 0,
          ...listItemContainerStyle,
        }}
        listParentContainerStyle={{
          borderWidth: 0,
          ...listParentContainerStyle,
        }}
        textStyle={{
          fontSize: 14,
          fontFamily: fonts.semibold,
          color: colors.secondary_80,
        }}
        placeholderStyle={{
          fontSize: 16,
          fontFamily: fonts.regular,
          color: colors.secondary_40,
        }}
        dropDownContainerStyle={{
          borderTopWidth: 0,
          borderColor: colors.primary_100,
          ...dropDownContainerStyle,
        }}
        listItemLabelStyle={{
          fontSize: 14,
          fontFamily: fonts.semibold,
          color: colors.secondary_80,
        }}
        style={{
          minHeight: 45,
          marginBottom: 12,
          borderRadius: 12,
          borderColor: colors.primary_100,
          ...style,
        }}
        placeholder={placeholder ?? 'Selecione'}
        zIndex={zIndex}
        searchable={searchable}
        searchPlaceholder="Pesquisar..."
        zIndexInverse={zIndexInverse}
        dropDownDirection="BOTTOM"
        arrowIconStyle={{ tintColor: colors.primary_100 } as any}
        ListEmptyComponent={() => <View />}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </View>
  );
};

export default Dropdown;

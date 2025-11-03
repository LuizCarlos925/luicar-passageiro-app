import styled from 'styled-components/native';

export const Container = styled.Pressable<{
  isSelected?: boolean;
  hasBorder?: boolean;
}>`
  flex-direction: row;
  width: 100%;

  align-items: center;

  padding: 8px 10px;
  gap: 10px;

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary_20 : 'transparent'};
`;

export const TextWrapper = styled.View`
  flex: 1;

  gap: 4px;
`;

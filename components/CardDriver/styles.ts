import styled from 'styled-components/native';

export const Container = styled.View<{ hasBorder?: boolean }>`
  flex-direction: row;
  width: 100%;

  align-items: center;

  gap: 15px;

  ${({ hasBorder }) =>
    hasBorder && {
      padding: '10px 15px',
      borderRadius: 15,
    }};
`;

export const Row = styled.View`
  flex-direction: row;

  align-items: center;

  gap: 5px;
`;

export const ProfileWrapper = styled.View`
  flex: 1;
`;

export const TextMarker = styled.View`
  width: 5px;
  height: 5px;

  border-radius: 3px;

  background-color: ${({ theme }) => theme.colors.gray_d9};
`;

export const RatingWrapper = styled.View<{ isActive?: boolean }>`
  flex-direction: row;
  height: 35px;

  align-items: center;

  padding: 0 14px;
  gap: 5px;

  border-radius: 10px;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_60 : theme.colors.neutro_10};
`;

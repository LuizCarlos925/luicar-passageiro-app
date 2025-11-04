import styled from 'styled-components/native';

export const Container = styled.Pressable`
  width: 100%;

  padding: 15px;
  gap: 15px;

  border-radius: 15px;

  border: 1px solid ${({ theme }) => theme.colors.secondary_20};

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;

  gap: 15px;
`;

export const VehicleWrapper = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;

  padding: 16px 14px;
  gap: 10px;

  border: 1px solid ${({ theme }) => theme.colors.gray_9e}70;
  border-radius: 12px;

  background-color: #f1f1f1;
`;

export const TextWrapper = styled.View`
  gap: 5px;
`;

export const TrailWrapper = styled.View`
  align-items: center;

  gap: 4px;
`;

export const VerticalLine = styled.View`
  width: 1px;
  height: 26px;

  background-color: ${({ theme }) => theme.colors.secondary_60};
`;

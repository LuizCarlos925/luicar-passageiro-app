import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;

  gap: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;

  justify-content: space-between;
  row-gap: 8px;
`;

export const SuccessContainer = styled.View`
  flex-direction: row;

  width: 100%;

  align-items: center;

  gap: 10px;
`;

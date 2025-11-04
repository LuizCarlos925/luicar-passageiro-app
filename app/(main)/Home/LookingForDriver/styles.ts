import styled from 'styled-components/native';

export const LineHandler = styled.View`
  width: 85px;
  height: 6px;

  align-self: center;

  margin: 15px 0;

  border-radius: 20px;

  background-color: #d2d6db;
`;

export const ContentWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    gap: 8,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const RideInfoWrapper = styled.View`
  width: 100%;

  padding: 10px;
  gap: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;

  justify-content: space-between;

  gap: 5px;
`;

export const Column = styled.View`
  gap: 5px;
`;

export const HideLogo = styled.View`
  position: absolute;
  bottom: 10px;
  right: 0;

  width: 30%;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.neutro_10};
`;

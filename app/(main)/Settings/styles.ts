import styled from 'styled-components/native';

export const ProfileRow = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin-top: 50px;
`;

export const ProfileName = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.primary_100};

  line-height: 18px;
`;

export const VersionText = styled.Text`
  align-self: center;

  margin-top: 12px;

  font-size: 11px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.gray_9e};
`;

export const OptionButton = styled.Pressable`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 16px 0;
  gap: 20px;

  border-radius: 8px;
`;

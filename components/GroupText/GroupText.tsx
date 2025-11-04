import { colors } from '@/global/theme';
import { IconComponent, IconT } from '../Icon/Icon';
import Text from '../Text/Text';
import { Row, TextWrapper } from './styles';

type Props = {
  title1: string;
  title2?: string;
  text1: string;
  text2?: string;
  iconLeft?: IconT;
  alignLeft?: boolean;
  color?: string;
};

export const GroupText = ({
  title1,
  title2,
  text1,
  text2,
  iconLeft,
  alignLeft = false,
  color,
}: Props) => {
  return (
    <TextWrapper>
      <Row>
        <Row style={{ width: undefined, gap: 10 }}>
          {iconLeft && (
            <IconComponent
              name={iconLeft}
              size={16}
              color={colors.primary_100}
            />
          )}

          <Text size={16} fontWeight={600} color={color || colors.primary_20}>
            {title1}
          </Text>
        </Row>
        {title2 && (
          <Text
            size={16}
            fontWeight={600}
            color={color || colors.primary_20}
            style={{ width: alignLeft ? '40%' : undefined }}
          >
            {title2}
          </Text>
        )}
      </Row>

      <Row>
        <Text
          size={16}
          color={colors.neutro_00}
          style={{ maxWidth: text2 ? '70%' : '100%' }}
        >
          {text1}
        </Text>
        {text2 && (
          <Text
            size={16}
            color={colors.neutro_00}
            style={{ width: alignLeft ? '40%' : undefined }}
          >
            {text2}
          </Text>
        )}
      </Row>
    </TextWrapper>
  );
};

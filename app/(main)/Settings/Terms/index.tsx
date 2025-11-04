import React from 'react';

import Text from '@/components/Text/Text';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import ScrollContainer from '@/components/ScrollContainer/ScrollContainer';

import { colors } from '@/global/theme';

const Terms = () => {
  return (
    <GlobalContainer
      alignItems="flex-start"
      paddingHorizontal={16}
      gap={30}
      scrollable={false}
    >
      <BackButton />

      <Text size={24} fontWeight={700} color={colors.secondary_100}>
        Termos de uso
      </Text>

      <Text size={16} color={colors.secondary_60}>
        Termos de uso do aplicativo Luicar{'\n'}
        Data da última atualização: 06/09/2025
      </Text>

      <ScrollContainer>
        <Text size={16} color={colors.secondary_60}>
          lorem ipsum dolor sit amet consectetur. Lacus massa laoreet quam
          viverra. Orci malesuada sodales quis odio purus in venenatis. In
          turpis eu egestas posuere faucibus. Vel interdum mauris eu vel in
          vestibulum fermentum. Est ut massa mauris erat ante tristique
          tincidunt vel. Aenean vivamus vulputate nam tincidunt in. Facilisis
          eleifend dignissim ut pellentesque. Pharetra ultrices arcu magna nulla
          tellus ut tincidunt aliquet eget. At placerat volutpat tortor justo
          varius. Velit ut mattis eu tincidunt leo bibendum varius. Odio aenean
          in nibh lobortis molestie bibendum ornare. Erat massa ut egestas duis
          adipiscing egestas. Egestas platea odio at eleifend dui sollicitudin
          vulputate nibh. Praesent tempor aliquet ut non tincidunt. At morbi nec
          adipiscing eu mattis volutpat at venenatis enim. A
        </Text>
      </ScrollContainer>
    </GlobalContainer>
  );
};

export default Terms;

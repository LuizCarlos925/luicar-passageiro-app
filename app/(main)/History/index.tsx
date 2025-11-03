import { CardHistoryRating } from '@/components/CardHistoryRating/CardHistoryRating';
import { GlobalContainer } from '@/components/Container/Container';
import Text from '@/components/Text/Text';
import { colors } from '@/global/theme';
import { formatDateNominal } from '@/utils/format';
import { router } from 'expo-router';
import { FlatList, View } from 'react-native';

import { ITrip } from '@/interfaces/history';
import { mockHistory } from '@/mock/history';

const History = () => {
  return (
    <GlobalContainer paddingHorizontal={20} showTabBar>
      <FlatList
        keyExtractor={([date]) => date}
        data={Object.entries(mockHistory)}
        renderItem={({ item: [date, trips] }) => (
          <View style={{ width: '100%', gap: 10 }}>
            <Text size={14} fontWeight={600} color={colors.neutro_70}>
              {formatDateNominal(date)}
            </Text>
            {trips?.map((trip: ITrip) => (
              <CardHistoryRating
                key={trip?.id?.toString()}
                trip={trip}
                onPress={() =>
                  router.push({
                    pathname: '/(main)/History/TripDetails',
                    params: { id: trip?.id },
                  })
                }
              />
            ))}
          </View>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ padding: 4, gap: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </GlobalContainer>
  );
};

export default History;

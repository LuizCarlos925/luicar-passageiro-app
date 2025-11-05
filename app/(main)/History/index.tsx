import { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';

import Text from '@/components/Text/Text';
import { RatingBS, ReportBS } from '@/components/screen';
import { GlobalContainer } from '@/components/Container/Container';
import { CardHistoryRating } from '@/components/CardHistoryRating/CardHistoryRating';

import { colors } from '@/global/theme';

import { ITrip } from '@/interfaces/history';

import { formatDateNominal } from '@/utils/format';

import { mockHistory } from '@/mock/history';

const History = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isReport, setIsReport] = useState(false);

  return (
    <GlobalContainer
      alignItems="flex-start"
      paddingHorizontal={20}
      gap={24}
      showTabBar
      component={
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={[250, 350]}
          handleComponent={() => <View style={styles.lineHandler} />}
          backgroundStyle={{ backgroundColor: colors.neutro_00 }}
          enablePanDownToClose
        >
          {isReport ? (
            <ReportBS onPressClose={() => setIsReport(false)} />
          ) : (
            <RatingBS
              onPressClose={() => bottomSheetRef.current?.close()}
              onPressReport={() => setIsReport(true)}
            />
          )}
        </BottomSheet>
      }
    >
      <Text
        size={24}
        fontWeight={700}
        color={colors.primary_100}
        marginTop={24}
      >
        Histórico de corridas
      </Text>
      <FlatList
        keyExtractor={([date]) => date}
        data={Object.entries(mockHistory)}
        renderItem={({ item: [date, trips] }) => (
          <View style={{ width: '100%', gap: 24 }}>
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
                onPressRate={() => bottomSheetRef.current?.expand()}
              />
            ))}
          </View>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ padding: 4, gap: 24 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  lineHandler: {
    width: 85,
    height: 6,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#d2d6db',
  },
});

export default History;

import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';

import { EmptyHistoryImg } from '@/assets/images';

import Text from '@/components/Text/Text';
import { RatingBS, ReportBS } from '@/components/screen';
import { GlobalContainer } from '@/components/Container/Container';
import { CardHistoryRating } from '@/components/CardHistoryRating/CardHistoryRating';

import { colors } from '@/global/theme';

import { ITrip } from '@/interfaces/history';

import { useHistory } from '@/services/History/history.service';

import { formatDateNominal } from '@/utils/format';

const History = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isReport, setIsReport] = useState(false);
  const [tripId, setTripId] = useState<number | null>(null);

  const { data: history, isFetching } = useHistory();

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
            <ReportBS tripId={tripId} onPressClose={() => setIsReport(false)} />
          ) : (
            <RatingBS
              tripId={tripId}
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

      {isFetching ? (
        <ActivityIndicator
          size={40}
          color={colors.primary_60}
          style={{ alignSelf: 'center', marginTop: 20 }}
        />
      ) : (
        <FlatList
          keyExtractor={([date]) => date}
          data={Object.entries(history || {})}
          renderItem={({ item: [date, trips] }) => (
            <View style={{ width: '100%', gap: 24 }}>
              <Text size={14} fontWeight={600} color={colors.neutro_70}>
                {formatDateNominal(date)}
              </Text>
              {(trips as ITrip[])?.map(trip => (
                <CardHistoryRating
                  key={trip?.id?.toString()}
                  trip={trip}
                  onPress={() =>
                    router.push({
                      pathname: '/(main)/History/TripDetails',
                      params: { id: trip?.id },
                    })
                  }
                  onPressRate={() => {
                    setTripId(trip?.id);
                    bottomSheetRef.current?.expand();
                  }}
                />
              ))}
            </View>
          )}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, padding: 4, gap: 24 }}
          ListEmptyComponent={<Empty />}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      )}
    </GlobalContainer>
  );
};

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Image source={EmptyHistoryImg} style={styles.image} />

      <Text size={20} fontWeight={700} style={styles.text}>
        Nenhuma corrida até agora
      </Text>
      <Text color={colors.secondary_60} style={styles.text}>
        Assim que você viajar com a Luicar, poderá ver o histórico de corridas
        aqui
      </Text>
    </View>
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  image: {
    width: '80%',
    height: 200,
  },
  text: {
    textAlign: 'center',
  },
});

export default History;

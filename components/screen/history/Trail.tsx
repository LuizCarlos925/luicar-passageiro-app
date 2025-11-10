import { StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

type Props = {
  destination: {
    address: string;
    time: string;
  };
  origin: {
    address: string;
    time: string;
  };
  duration: string;
};

const Trail = ({ destination, origin, duration }: Props) => {
  return (
    <View style={[styles.row, { gap: 20 }]}>
      <View style={styles.trailWrapper}>
        <IconComponent name="PinIcon" size={16} />

        <View style={styles.lineVertical} />

        <IconComponent name="FlagIcon" size={16} />
      </View>

      <View style={[styles.routerWrapper, { gap: 20 }]}>
        <Address type="Saída" address={origin.address} time={origin.time} />

        <Route time={duration} />

        <Address
          type="Destino"
          address={destination.address}
          time={destination.time}
        />
      </View>
    </View>
  );
};

type RouteProps = {
  time: string;
};

const Route = ({ time }: RouteProps) => {
  return (
    <View style={styles.routerWrapper}>
      <Text fontWeight={500} color={colors.secondary_100}>
        Percurso
      </Text>

      <View style={styles.addressWrapper}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text fontWeight={500}>Duração</Text>

          <View style={[styles.row, { width: undefined }]}>
            <IconComponent name="ClockOutlineIcon" size={14} />
            <Text fontWeight={500} color={colors.primary_100}>
              {time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

type AddressProps = {
  type: 'Saída' | 'Destino';
  address: string;
  time: string;
};

const Address = ({ type, address, time }: AddressProps) => {
  return (
    <View style={styles.routerWrapper}>
      <Text fontWeight={500} color={colors.secondary_100}>
        {type}
      </Text>

      <View style={styles.addressWrapper}>
        <View>
          <Text fontWeight={500}>Endereço</Text>
          <Text size={12}>{address}</Text>
        </View>

        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text fontWeight={500}>Hora</Text>
          <Text size={12}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineVertical: {
    width: 1,
    flex: 1,
    backgroundColor: colors.secondary_20,
  },
  trailWrapper: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 20,
  },
  wrapper: {
    flexShrink: 1,
    gap: 4,
  },
  routerWrapper: {
    flex: 1,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  addressWrapper: {
    width: '100%',
    padding: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: colors.secondary_10,
  },
});

export default Trail;

import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <Text color={colors.neutro_00}>Bom ter você de volta,</Text>
          <Text size={20} fontWeight={600} color={colors.neutro_00}>
            Gabriel
          </Text>
        </View>
        <IconComponent name="LogoWhiteIcon" size={71} />
      </View>

      <Text size={12} color={colors.neutro_00}>
        Para onde vamos hoje?
      </Text>

      <Pressable style={styles.button}>
        <IconComponent name="SearchIcon" size={18} color={colors.primary_100} />
        <Text size={16} fontWeight={500}>
          Para onde?
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    alignItems: 'center',
    borderRadius: 60,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: colors.primary_10,
  },
});

export default Header;

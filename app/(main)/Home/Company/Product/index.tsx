import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import Text from '@/components/Text/Text';
import { width } from '@/global/constants';
import { colors } from '@/global/theme';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const Product = () => {
  return (
    <GlobalContainer paddingHorizontal={20} gap={16}>
      <BackButton style={styles.backButton} />

      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSfyaTZOko_17t4u7gXTn7_mIbHJLcQKDMw&s',
        }}
        style={styles.image}
      />

      <View style={styles.line} />

      <View style={styles.categoryWrapper}>
        <Text color={colors.primary_100}>Nome da categoria</Text>
      </View>

      <Text size={32} fontWeight={700}>
        Brabo Brabíssimo Frango
      </Text>
      <Text color={colors.secondary_60}>
        Lorem ipsum dolor sit amet consectetur. Sollicitudin a quis neque
        scelerisque. Enim orci eget accumsan nisi ut nisl. Egestas congue porta
        in consectetur iaculis facilisi maecenas ornare sed. Mauris etiam nibh
        odio ut sapien nunc nunc vitae id. Ullamcorper massa gravida donec
        elementum nisi aliquam. Rhoncus quis nunc aliquam ut non libero aliquam
        diam. Posuere consectetur vitae tellus mauris laoreet tortor adipiscing
        odio ut. Convallis arcu sed at ut. Risus adipiscing elit turpis id orci
        pulvinar donec.
      </Text>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 8,
  },
  categoryWrapper: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.primary_100,
    borderRadius: 20,
    backgroundColor: colors.primary_20,
  },
  line: {
    width,
    height: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary_20,
  },
});

export default Product;

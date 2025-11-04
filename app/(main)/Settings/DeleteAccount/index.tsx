import { Button } from '@/components/Button/Button';
import { GlobalContainer } from '@/components/Container/Container';
import Text from '@/components/Text/Text';

const DeleteAccount = () => {
  return (
    <GlobalContainer>
      <Text>Tem certeza que deseja excluir sua conta?</Text>
      <Button onPress={() => null} />
    </GlobalContainer>
  );
};

export default DeleteAccount;

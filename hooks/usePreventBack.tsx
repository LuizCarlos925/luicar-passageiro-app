import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const usePreventBack = () => {
  useEffect(() => {
    const onBackPress = () => true;

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
};

export default usePreventBack;

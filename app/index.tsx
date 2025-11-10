import React from 'react';
import { Redirect } from 'expo-router';

const Root = () => {
  return <Redirect href={__DEV__ ? '/(auth)/Intro' : '/(auth)/Intro'} />;
};

export default Root;

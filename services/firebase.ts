import { FirebaseOptions, initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

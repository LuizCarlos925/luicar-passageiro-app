import Text from '@/components/Text/Text';
import { colors } from '@/global/theme';
import { differenceInSeconds, intervalToDuration } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type Props = {
  date: string;
  type: 'progressivo' | 'regressivo';
  fontSize?: number;
  fontWeight?: 700 | 600 | 500 | 400 | 300;
};

const Counter = ({ date, type, fontSize = 24, fontWeight = 700 }: Props) => {
  const [count, setCount] = useState(0);
  const appState = useRef(AppState.currentState);

  const calculateCurrentCount = () => {
    const targetDate = new Date(date);
    const now = new Date();
    const difference = differenceInSeconds(targetDate, now);

    if (difference > 0) {
      return difference;
    }
    return Math.abs(difference);
  };

  useEffect(() => {
    const initialCount = calculateCurrentCount();
    setCount(initialCount);
  }, [date, type]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          const newCount = calculateCurrentCount();
          setCount(newCount);
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCount = calculateCurrentCount();
      setCount(newCount);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const timer = intervalToDuration({ start: 0, end: count * 1000 });

  const formatTime = () => {
    const hours = timer.hours || 0;
    const minutes = timer.minutes || 0;
    const seconds = timer.seconds || 0;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Text size={fontSize} fontWeight={fontWeight} color={colors.neutro_00}>
      {formatTime()}
    </Text>
  );
};

export default Counter;

import Text from '@/components/Text/Text';
import { colors } from '@/global/theme';
import { differenceInSeconds, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

type Props = {
  date: string; // Date ISO
  type: 'progressivo' | 'regressivo';
};

const Counter = ({ date, type }: Props) => {
  const [count, setCount] = useState(0);
  const [currentType, setCurrentType] = useState(type);

  const calculateInitialCount = (isoDate: string, counterType: string) => {
    const targetDate = new Date(isoDate);
    const now = new Date();
    const difference = differenceInSeconds(targetDate, now);

    if (counterType === 'regressivo') {
      return Math.max(0, difference);
    }
    return Math.abs(difference);
  };

  useEffect(() => {
    const initialCount = calculateInitialCount(date, type);
    setCount(initialCount);
    setCurrentType(type);
  }, [date, type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (currentType === 'regressivo') {
          if (prevCount <= 1) {
            setCurrentType('progressivo');
            const targetDate = new Date(date);
            const now = new Date();
            const elapsed = differenceInSeconds(now, targetDate);
            return Math.max(0, elapsed);
          }
          return prevCount - 1;
        }
        return prevCount + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentType, date]);

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
    <View>
      <Text size={24} fontWeight={700} color={colors.neutro_00}>
        {formatTime()}
      </Text>
    </View>
  );
};

export default Counter;

import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';

export const useSoutListner = () => {
  const [meanTimeLog, setMeanTimeLog] = useState<string>('');
  const [memoryDeltaLog, setmemoryDeltaLog] = useState<string>('');
  useEffect(() => {
    DeviceEventEmitter.addListener('SystemOutLogEvent', data => {
      try {
        console.log('SystemOutLogEvent-->', data);
        const log = data?.log;
        if (log.includes('Overall Mean Time')) {
          setMeanTimeLog(log);
        } else if (log.includes('Memory Delta:')) {
          setmemoryDeltaLog(log);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  return {
    meanTimeLog,
    setMeanTimeLog,
    memoryDeltaLog,
    setmemoryDeltaLog,
  };
};

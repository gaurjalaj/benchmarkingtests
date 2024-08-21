import React, {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';

export const useSoutListner = () => {
  useEffect(() => {
    DeviceEventEmitter.addListener('SystemOutLogEvent', data => {
      console.log('SystemOutLogEvent-->', data);
    });
  }, []);
};

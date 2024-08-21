/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  NativeModules,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSoutListner } from './SoutListner';

const App = () => {
  useSoutListner();
  const [availProcessors, setAvailProcessors] = useState<number | null>(null);
  const [count, setCount] = useState<number>(0);

  const [isParallelButtonDisabled, setIsParallelButtonDisabled] =
    useState<boolean>(true);
  const [isIterativeButtonDisabled, setisIterativeButtonDisabled] =
    useState<boolean>(true);

  const [showActivityIndicator, setShowActivityIndicator] =
    useState<boolean>(false);

  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  const handleMultipleParallel = async () => {
    try {
      setShowActivityIndicator(true);
      setTimeTaken(null);
      console.log('[handleMultipleParallel]', {count});
      setisIterativeButtonDisabled(true);
      setIsParallelButtonDisabled(true);
      const start = Date.now();
      const multipleParallelRes =
        await NativeModules.MultiplyStats.multiplyParallel(count);
      const end = Date.now();
      const timeTaken = end - start;
      // console.log('[handleMultipleParallel] timeTaken: ', timeTaken);
      // console.log({multipleParallelRes});
      setisIterativeButtonDisabled(false);
      setIsParallelButtonDisabled(false);
      setTimeTaken(timeTaken);
      setShowActivityIndicator(false);
    } catch (error) {
      setShowActivityIndicator(false);
      console.error(error);
      setisIterativeButtonDisabled(false);
      setIsParallelButtonDisabled(false);
    }
  };

  const handleMultipleIterative = async () => {
    try {
      setShowActivityIndicator(true);
      setTimeTaken(null);
      console.log('[handleMultipleIterative]', {count});
      setisIterativeButtonDisabled(true);
      setIsParallelButtonDisabled(true);
      const start = Date.now();
      const multipleIterative =
        await NativeModules.MultiplyStats.multiplyIterative(Math.pow(2, count));
      // console.log({multipleIterative});
      const end = Date.now();
      const timeTaken = end - start;
      setTimeTaken(timeTaken);
      console.log('[handleMultipleIterative] timeTaken: ', timeTaken);
      setisIterativeButtonDisabled(false);
      setIsParallelButtonDisabled(false);
      setShowActivityIndicator(false);
    } catch (error) {
      setShowActivityIndicator(false);
      console.error(error);
      setisIterativeButtonDisabled(false);
      setIsParallelButtonDisabled(false);
    }
  };

  const checkAvailProcessors = async () => {
    try {
      const availProcessorsRes =
        await NativeModules.MultiplyStats.checkAvailProcessors();
      setAvailProcessors(availProcessorsRes);
    } catch (error) {
      console.error(error);
    }
  };

  const testtodownload = async () => {
    try {
      // const testtodownloadRes = await NativeModules.MultiplyStats.saveToDownloads("yguyguybvhjbvu", "testdownload.txt");
      const testtodownloadRes =
        await NativeModules.MultiplyStats.saveToDownloadsToCustomDir(
          'new data',
          'zunu',
          'ZunuLogin_13_08_2024.zrf',
        );
      console.log({testtodownloadRes});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
          fontWeight: 600,
          textAlign: 'center',
          textDecorationLine: 'underline',
        }}>
        Benchmarks
      </Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 50,
        }}>
        multiply_stats
      </Text>
      <View style={{marginTop: 10}}>
        <Button
          onPress={checkAvailProcessors}
          title="check Available processors"
        />
        {availProcessors && (
          <Text
            style={{
              color: '#fff',
              fontSize: 50,
              textAlign: 'center',
            }}>
            {availProcessors}
          </Text>
        )}
      </View>
      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 100,
          padding: 10,
          color: '#fff',
        }}
        onChangeText={text => {
          const numberValue = text ? parseInt(text) : 0;
          if (numberValue) {
            setCount(numberValue);
            setIsParallelButtonDisabled(false);
            setisIterativeButtonDisabled(false);
          } else {
            setIsParallelButtonDisabled(true);
            setisIterativeButtonDisabled(true);
          }
        }}
        placeholder="Enter count"
        inputMode="numeric"
        keyboardType="numeric"
        placeholderTextColor="#fff"
      />
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Button
          onPress={handleMultipleParallel}
          disabled={isParallelButtonDisabled}
          title="MultiplyParallel"
        />
      </View>
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        {/*
       <Button
          onPress={handleMultipleIterative}
          disabled={isIterativeButtonDisabled}
          title="MultiplyIterative"
        />
        */}
      </View>
      {showActivityIndicator && (
        <ActivityIndicator
          style={{
            marginTop: 10,
          }}
          size={50}
        />
      )}
      {timeTaken && (
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 50,
            fontSize: 40,
            width: '90%',
          }}>
          time taken: {'\n'} {timeTaken} mili seconds {'\n'} or{' '}
          {timeTaken / 1000} seconds
        </Text>
      )}

      {/* <Button onPress={testtodownload} title="testtodownload" /> */}
    </View>
  );
};

export default App;

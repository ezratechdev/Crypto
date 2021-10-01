/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

// custom
import Chart from "./app/components/Chart";
import List from "./app/components/List";
import { getMarketData } from "./app/services/geckoApi";


export default function App() {
  // bottom sheet
  const bottomSheetModalRef = useRef(null);
  const [selectedCoin, setSelectedCoinFunc] = useState(null);
  // variables
  const snapPoints = useMemo(() => ['45%'], []);
  // callbacks
  const handlePresentModalPress = useCallback(item => {
    // console.log(item);
    bottomSheetModalRef.current?.present();
    setSelectedCoinFunc(item);
  }, []);

  // data
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  const ListHeader = () => {
    return (
      <>
        <View style={styles.headerView}>
          <Text style={styles.boldTitle}>Market</Text>
        </View>
        <View style={styles.devider} />
      </>
    )
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={false} backgroundColor="#767676" />
        <View style={styles.container}>
          {data ? (
            <FlatList
              data={data}
              ListHeaderComponent={<ListHeader />}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <List
                  name={item.name}
                  symbol={item.symbol}
                  currentPrice={item.current_price}
                  price7D={item.price_change_percentage_7d_in_currency}
                  logo={item.image}
                  onPress={() => handlePresentModalPress(item)}
                />
              )}
            />) : (
            <ActivityIndicator />
          )}
        </View>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer}>
          {selectedCoin ? <Chart
            name={selectedCoin.name}
            symbol={selectedCoin.symbol}
            currentPrice={selectedCoin.current_price}
            price7D={selectedCoin.price_change_percentage_7d_in_currency}
            logo={selectedCoin.image}
            sparkline={selectedCoin?.sparkline_in_7d.price}
          /> : null}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerView: {
    margin: 2,
    paddingHorizontal: 16,
  },
  devider: {
    marginHorizontal: 16,
    backgroundColor: '#A9ABB1',
    height: StyleSheet.hairlineWidth,
    marginTop: 16,
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#A9ABB1",
    marginTop: 10,
  }
});
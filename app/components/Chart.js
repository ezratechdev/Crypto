/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import { ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation, ChartYLabel } from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

export const { width: SIZE } = Dimensions.get('window');

export default function Chart({ name, symbol, currentPrice, sparkline, logo, price7D }) {
    const latestPrice = useSharedValue(currentPrice);
    React.useEffect(() => {
        latestPrice.value = currentPrice;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPrice]);
    const formatUSD = value => {
        'worklet';
        if (value === '') {
            const formattedValue = `$${latestPrice.value.toLocaleString('en-US', { currency: 'USD' })}`
            return formattedValue;
        }

        const formattedValue = `$ ${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        return formattedValue;
    };
    if (name && symbol && currentPrice && sparkline && logo && price7D) {
        const points = monotoneCubicInterpolation({ data: sparkline, range: 40 });
        const priceColor = (price7D > 0) ? "#34C759" : "#Ff3B30";
        const dotColor = !((price7D > 0)) ? "#34C759" : "#Ff3B30";
        return (
            <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
                <View style={styles.view}>
                    <View style={styles.dataView}>
                        {/* left */}
                        <View style={styles.left}>
                            <Image source={{ uri: logo }} style={{ width: 24, height: 24, margin: 5 }} />
                            <View>
                                <Text style={styles.boldTitle}>{name} {symbol.toUpperCase()}</Text>
                                <Text style={styles.subtitle}>7D</Text>
                            </View>
                        </View>
                        {/* right */}
                        <View style={styles.right}>
                            {/* <Text style={[styles.subtitle , {fontSize:18}]}>$ {currentPrice.toLocaleString('en-US', { currency: "USD" })}</Text> */}
                            <ChartYLabel
                                format={formatUSD}
                                style={styles.boldTitle}
                            />
                            <Text style={[styles.subtitle, { color: priceColor }]}>{price7D.toFixed(2)}%</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <ChartPath height={SIZE / 2} stroke={priceColor} width={SIZE} />
                        <ChartDot style={{ backgroundColor: dotColor }} />
                    </View>
                </View>
            </ChartPathProvider>
        )
    } else return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Text style={{
                color: "#767676",
                fontSize: 17,
                fontWeight: "bold",
            }}>Opps!! No data found</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    dataView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    left: {
        alignItems: "center",
        flexDirection: "row",
    },
    right: {
        alignItems: "center",
        alignSelf: "flex-end",
    },
    boldTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#A9ABB1',
    },
});
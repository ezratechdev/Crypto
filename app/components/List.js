/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";


export default function List({ name, symbol, price7D, currentPrice, logo, onPress }) {
    if (name && symbol && price7D && currentPrice && logo && onPress) {
        const priceColor = (price7D > 0) ? "#34C759" : "#FF3B30";
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.view}>
                    {/* left wrapper */}
                    <View style={styles.leftWrapper}>
                        <Image source={{ uri: logo }} style={styles.image} />
                        <View>
                            <Text style={styles.title}>{name}</Text>
                            <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
                        </View>
                    </View>
                    {/* right wrapper */}
                    <View style={styles.rightWrapper}>
                            <Text style={styles.title}>$ {currentPrice.toLocaleString('en-US' , {
                                currency:"USD",
                            })}</Text>
                            <Text style={[styles.subTitle , {color:priceColor}]}>{price7D.toFixed(2)}%</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    } else return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
        }}>
            <Text style={{
                fontSize: 17,
                color: "#767676",
                fontWeight: "700",
            }}>No data</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        height: 48,
        width: 48,
        margin: 2,
    },
    leftWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subTitle: {
        marginTop: 4,
        fontSize: 14,
        color: "#A9ABB1"
    },
    rightWrapper:{
        alignItems:"flex-end",
    }
});
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { theme } from '../../Theme/Theme';

interface ButtonProps {
  value:string;
  onPress:()=>void;
  loading?:boolean;
}
const CustomButton = ({value, onPress, loading}:ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={30} color="#fff" />
        </View>
      ) : (
        <Text style={styles.text}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: theme.lightBlue,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 13,
    gap: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: theme.white,
    height: 24,
  },
  loadingContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

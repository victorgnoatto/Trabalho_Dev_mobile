import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FlagProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function Flag({ label, selected, onPress }: FlagProps) {
  return (
    <TouchableOpacity
      style={[styles.flag, selected && styles.flagSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.flagText, selected && styles.flagTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  flagSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  flagText: {
    color: '#333',
    fontWeight: 'bold',
  },
  flagTextSelected: {
    color: '#fff',
  },
});

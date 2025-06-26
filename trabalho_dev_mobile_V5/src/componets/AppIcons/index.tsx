// components/AppIcon.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons, FontAwesome, Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import {styles} from './styles';

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>
  | React.ComponentType<React.ComponentProps<typeof Ionicons>>
  | React.ComponentType<React.ComponentProps<typeof AntDesign>>;

type IconType =
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'Octicons'
  | 'Ionicons'
  | 'AntDesign';

interface AppIconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  viewIconStyle?: ViewStyle; 
}

const iconMap: Record<IconType, IconComponent> = {
  MaterialIcons,
  FontAwesome,
  Octicons,
  Ionicons,
  AntDesign,
};

// quando for importar em outro arquivo, posso importar sem precisar usar chaves {}, porque é o default export.
export default function AppIcon({
  type,
  name,
  size = 24,
  color = '#2b5f56',
  viewIconStyle,
}: AppIconProps) {
  const Icon = iconMap[type];

  return (
    <View style={[styles.viewIcon, viewIconStyle]}>
      <Icon name={name as any} size={size} color={color} />
    </View>
  );
}

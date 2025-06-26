import React, { forwardRef, LegacyRef, Fragment } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { styles } from './style';
import { MaterialIcons, FontAwesome, Octicons, Ionicons } from '@expo/vector-icons';
import { themes } from '../../global/themes';

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Ionicons>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRight?: IconComponent;
  IconLeftName?: string;
  IconRightName?: string;
  title?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
  borderColor?: string;
  boldTxtTransparent?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  isDescription?: boolean;  // <-- ADICIONADO
};

export const Input = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {
  const {
    IconLeft,
    IconRight,
    IconLeftName,
    IconRightName,
    title,
    placeholder,
    placeholderTextColor,
    onIconLeftPress,
    onIconRightPress,
    borderColor,
    boldTxtTransparent,
    labelStyle,
    isDescription,
    ...rest
  } = Props;

  const calculateSizeWidth = () => {
    if (IconLeft && IconRight) return '80%';
    if (IconLeft || IconRight) return '90%';
    return '100%';
  };

  const calculatePaddingLeft = () => {
    if (IconLeft && IconRight) return 10;
    if (IconLeft || IconRight) return 10;
    return 20;
  };

  const txtTransparent = boldTxtTransparent
    ? themes.colors.placeholderColorBold
    : themes.colors.placeholderColor;

  return (
    <Fragment>
      {title && <Text style={[styles.titleInput, labelStyle]}>{title}</Text>}
      <View
        style={[
          styles.boxInput,
          {
            paddingLeft: calculatePaddingLeft(),
            borderColor: borderColor ?? '#ffffff',
            borderWidth: 1,
            minHeight: isDescription ? 100 : undefined, // Aumenta a altura se for descrição
          },
        ]}
      >
        {IconLeft && IconLeftName && (
          <TouchableOpacity onPress={onIconLeftPress}>
            <IconLeft name={IconLeftName as any} size={20} color={txtTransparent} style={styles.Icon} />
          </TouchableOpacity>
        )}
        <TextInput
          ref={ref}
          style={[
            styles.inputLogin,
            {
              width: calculateSizeWidth(),
              textAlignVertical: isDescription ? 'top' : 'center', // mantém o texto da descrição allinhado no topo
              height: isDescription ? 100 : undefined, // ajusta de altura para descrição
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={txtTransparent}
          multiline={isDescription}
          {...rest}
        />
        {IconRight && IconRightName && (
          <TouchableOpacity onPress={onIconRightPress}>
            <IconRight name={IconRightName as any} size={20} color={txtTransparent} style={styles.Icon} />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
});
